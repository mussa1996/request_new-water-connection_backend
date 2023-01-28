import billingController from '../controllers/billing';
import express from 'express'
const route=express.Router()
route.post('/create',billingController.create)
route.get('/getAll',billingController.getBilling)
route.get('/getOne/', billingController.getOneBilling)
route.put('/update/', billingController.updateBilling)
route.delete('/delete/', billingController.deleteBilling)
route.get('/count',billingController.countBilling)
route.get('/countById',billingController.countBillingById)
route.get('/getBillingById',billingController.getBillingById)
route.get('/CountBillingByRequestId',billingController.CountBillingByRequestId)
module.exports=route