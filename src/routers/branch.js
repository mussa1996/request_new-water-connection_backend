import branchContoller from '../controllers/branch';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,branchContoller.create)
route.get('/getAll',userAuth,branchContoller.getBranch)
route.get('/getOne/', userAuth,branchContoller.getOneBranch)
route.put('/update/', userAuth,branchContoller.updateBranch)
route.delete('/delete/', userAuth,branchContoller.deleteBranch)
route.get('/count',branchContoller.countBranch)
route.get('/countById',branchContoller.countBranchById)
module.exports=route 