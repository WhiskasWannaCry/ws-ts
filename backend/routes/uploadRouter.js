const Router = require('express');
const fileMiddleware = require('../middleware/file');
const { Users } = require('../schemas');

const router = new Router();

router.post('/new_image', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    const { userID } = req.body;
    console.log(req.file);
    const user = await Users.findOne({ _id: userID });
    user.image = "http://localhost:5000/"+req.file.path;
    await user.save();
    res.json({ success: true, newImage: user.image });
  } catch (e) {
    console.log('Error in router: ', e);
  }
});

module.exports = router;
