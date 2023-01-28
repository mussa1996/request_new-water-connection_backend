import userController from '../controllers/user';
import branchController from '../controllers/branch'
import clientController from '../controllers/user-form'
import {adminAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
// user router
route.post('/login',userController.loginUser)
route.post('/logout',adminAuth,userController.logout)
route.get('/getAll',userController.findAll)
route.get('/getOne/',userController.findOne)
route.delete('/delete/',adminAuth,userController.deleteUser)
// branch router
route.get('/getAll/branch', branchController.getBranch)
route.get('/getOne/branch/',branchController.getOneBranch)
route.delete('/delete/branch/',branchController.deleteBranch)
route.get('/count/branch', branchController.countBranch)
route.get('/countById/branch',branchController.countBranchById)
route.post('/update/branch/',branchController.updateBranch)
//request router
route.get('/getAll/request',clientController.getClient)
route.get('/getOne/request/',clientController.getOneClient)
route.put('/update/request/', clientController.updateClient)
route.put('/update/status/', clientController.updateStatus)
route.delete('/delete/request/', adminAuth,clientController.deleteClient)

module.exports=route
 