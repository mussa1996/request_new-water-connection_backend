import express from 'express'

import commentCtrl from'../controllers/comment'

const router = express.Router()
router.post('/create/',commentCtrl.addComment )
router.get('/get/', commentCtrl.getCommentsByRequest)
router.get('/getOne/', commentCtrl.getOneComment)

module.exports = router