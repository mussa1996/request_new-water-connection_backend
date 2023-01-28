import express from "express";
const route=express.Router()
import userRoute from './user'
import adminRoute from './admin'
import clientRoute from './user-form'
import branchRoute from './branch'
import billingRoute from './billing'
import commentRoute from './comment'
route.use('/user',userRoute)
route.use('/admin',adminRoute)
route.use('/client_form',clientRoute)
route.use('/branch',branchRoute)
route.use('/billing',billingRoute)
route.use('/comment',commentRoute)
module.exports=route