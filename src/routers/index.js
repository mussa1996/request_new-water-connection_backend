import express from "express";
const route=express.Router()
import userRoute from './user'
import adminRoute from './admin'
import clientRoute from './user-form'
import branchRoute from './branch'
route.use('/user',userRoute)
route.use('/admin',adminRoute)
route.use('/client_form',clientRoute)
route.use('/branch',branchRoute)
module.exports=route