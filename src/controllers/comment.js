import mongoose from 'mongoose'
import Comment from '../models/comment'

exports.addComment = async(req,res)=>{
    try {
        const data = (req.body)
        const comment = new Comment({
          
          ...data, 
          request:req.query.request 
        
        })

        await comment.save()
        res.status(201).send({
            message:'comment added successfully', 
            comment
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

     

exports.getCommentsByRequest = async(req, res) => {
  
  await Comment.find({
      request: req.query.request
  }).then((data) => {

      res.status(200).send({
          message: "Message on this request found are:",
          data,
      });
  })  
}     
   
exports.getOneComment = async (req, res, next) => {
    try {
      const cust = await Comment.findOne({ _id: req.query.id }); 
      if (!cust) {
        res.status(404).send({
          message: "Comments not found",
        });
      }
      res.send({
        message: "Comments found is:",
        cust,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };