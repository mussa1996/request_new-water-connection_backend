import clientController from '../controllers/user-form';
import { userAuth} from '../middlewares/auth'
import express from 'express'
const route=express.Router()
route.post('/create',userAuth,clientController.create)
route.get('/getAll',clientController.getClient)
route.get('/getOne/',clientController.getOneClient)
route.put('/update/', userAuth,clientController.updateClient)
route.delete('/delete/', userAuth,clientController.deleteClient)
route.get('/countAll',clientController.countClient)
route.get('/countById',clientController.countClientById)
route.get('/getClientById',clientController.getClientById)
route.get('/CountClientByUserId',clientController.CountClientByUserId)
route.get('/CountClientByStatusP',clientController.CountClientByStatusP)
route.get('/CountClientByStatusA',clientController.CountClientByStatusA)
route.get('/CountClientByStatusR',clientController.CountClientByStatusR)
route.get('/CountClientByStatusC',clientController.CountClientByStatusC)
route.get('/getRequestByReturned',clientController.getClientByReturned)
route.get('/getRequestByPending',clientController.getClientByPending)
route.get('/getRequestByApproved',clientController.getClientByApproved)
route.get('/getRequestByCompleted',clientController.getClientByCompleted)

module.exports=route   