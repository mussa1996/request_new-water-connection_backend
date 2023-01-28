import userController from '../controllers/user';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/signup',userController.createUser)
route.put('/verify/',userController.verify)
route.post('/login',userController.loginUser)
route.post('/logout', userAuth,userController.logout)
// route.get('/getAll',userController.findAll)
route.get('/getOne/',userController.findOne)
route.put('/update/', userAuth,userController.updateUser)
route.delete('/delete/', userAuth,userController.deleteUser)
route.post('/forgetpassword',userController.forgetPassword)
route.put('/resetPassword',userController.resetPassword)
route.get('/count',userController.countUser)
route.get('/countById',userController.countUserById)
module.exports=route 