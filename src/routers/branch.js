import branchContoller from '../controllers/branch';
import { adminAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',adminAuth,branchContoller.create)
route.get('/getAll',adminAuth,branchContoller.getBranch)
route.get('/getOne/', adminAuth,branchContoller.getOneBranch)
route.put('/update/', adminAuth,branchContoller.updateBranch)
route.delete('/delete/', adminAuth,branchContoller.deleteBranch)
route.get('/count',branchContoller.countBranch)
route.get('/countById',branchContoller.countBranchById)
module.exports=route 