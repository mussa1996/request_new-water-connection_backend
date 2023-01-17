import userController from '../controllers/user';
import branchController from '../controllers/branch'
import clientController from '../controllers/user-form'
import {adminAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
// user router
route.post('/login',userController.loginUser)
route.post('/logout',adminAuth,userController.logout)
route.get('/getAll',adminAuth,userController.findAll)
route.get('/getOne/',adminAuth,userController.findOne)
route.delete('/delete/',adminAuth,userController.deleteUser)
// branch router
route.get('/getAll/branch', branchController.getBranch)
route.get('/getOne/branch/',branchController.getOneBranch)
route.delete('/delete/branch/',branchController.deleteBranch)
route.get('/count/branch', branchController.countBranch)
route.get('/countById/branch',branchController.countBranchById)
route.post('/update/branch/',branchController.updateBranch)
//request router
route.get('/getAll/request',adminAuth,clientController.getClient)
route.get('/getOne/request/', adminAuth,clientController.getOneClient)
route.put('/update/request/', adminAuth,clientController.updateClient)
route.delete('/delete/request/', adminAuth,clientController.deleteClient)

module.exports=route
 