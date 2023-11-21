const Router = require('express')
const controller = require('../authController')

const router = new Router()
const {check} = require('express-validator')

router.post('/registration',[
  check('username', "Username cannot be empty").notEmpty(),
  check('password',"Password may be longer than 4 and shorter than 20 symbols").isLength({min:4,max:20})
], controller.registration)
router.post('/login',controller.login)

module.exports = router;