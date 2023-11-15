const { Users } = require('./schemas');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

require('dotenv').config();

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation result error:',
          errors,
        });
      }
      const { username, email, password, image } = req.body;
      const candidate = await Users.findOne({ email });
      if (candidate) {
        return res.json({
          success: false,
          message: 'User is already registered',
        });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new Users({
        username,
        email,
        password: hashPassword,
        image,
      });
      await user.save();
      const token = generateAccessToken(user._id);
      const registeredUser = await Users.findOne({ email });
      const { followers, following } = registeredUser;

      return res.json({
        success: true,
        message: 'User is successful logined',
        user: { _id, email, image, username, token, followers, following },
      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, message: 'Error on server(registration)' });
    }
  }

  async login(req, res) {
    try {
      const { password, email } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res.json({
          success: false,
          message: `User with email ${email} is not found`,
        });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.json({
          success: false,
          message: `Entered password is incorrect`,
        });
      }
      const token = generateAccessToken(user._id);
      const { image, username, _id, followers, following } = user;

      return res.json({
        success: true,
        message: 'User is successful logined',
        user: { _id, email, image, username, token, followers, following },
      });
    } catch (e) {
      console.log(e);
      res.json({ message: 'Error on server(login)' });
    }
  }
}

module.exports = new authController();
