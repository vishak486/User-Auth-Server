const express=require('express')
const userController=require('../controllers/userController')
const jwtMiddleware=require('../middleware/jwtMiddleware')

const router=express.Router()

// register : http://localhost:3000/register
router.post('/register',userController.registerController)
// login : http://localhost:3000/login
router.post('/login',userController.loginController)
// all-user : http://localhost:3000/all-user
router.get('/all-user',jwtMiddleware,userController.allUserViewController)
// one-user : http://localhost:3000/one-user
router.get('/one-user',jwtMiddleware,userController.oneUserDetailsController)



module.exports=router
