import clientController from '../controllers/user-form';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,clientController.create)
route.get('/getAll',userAuth,clientController.getClient)
route.get('/getOne/', userAuth,clientController.getOneClient)
route.put('/update/', userAuth,clientController.updateClient)
route.delete('/delete/', userAuth,clientController.deleteClient)
route.get('/count',clientController.countClient)
route.get('/countById',clientController.countClientById)
module.exports=route