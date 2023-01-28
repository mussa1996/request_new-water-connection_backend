import UserForm from "../models/user-form";
import uploader from "../helper/storage";
import Comment from "../models/comment";

import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
exports.create = async (req, res) => {


  try {
    const images=req.files.id_image || req.files.passport_image;
    const response=await uploader(images.tempFilePath)
    const client = new UserForm({
      _id:'WASAC/WT/'+ Math.random().toString().slice(2,7),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      occupation: req.body.occupation,
      country: req.body.country,
      province: req.body.province,
      district: req.body.district,
      sector: req.body.sector,
      cell: req.body.cell,
      branch_name: req.body.branch_name,
      water_usage: req.body.water_usage,
      plot_number: req.body.plot_number,
      id_type:req.body.id_type,
      id_number: req.body.id_number,
      id_image: response.secure_url,
      passport_image:response.secure_url,
      passport: req.body.passport,
      issued_date: req.body.issued_date,
      expiry_date: req.body.expiry_date,
      status:req.body.status,
      user_id:req.user._id
    });
    
    const details = await client.save();
    res.send({
      message: "Client request saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getClient = async (req, res) => {
  await UserForm.find().then((pro) => {
    res.send({
      message: "Client request found are:",
      pro,
    });
  });
};

// exports.getOneClient = async (req, res, next) => {
//   try {


//     const requestComment = await Comment.find({request:req.query.id})
//         console.log("requestCom",requestComment)
//         let comment = [];
//         for(const c in requestComment){
//           // comment.push(artCom[c].full)
//           comment.push(requestComment[c].comment)
//           comment.push('___________________')
//         }
//     const cust = await UserForm.findOne({ _id: req.query.id });
//     if (!cust) {
//       res.status(404).send({
//         message: "Client request not found",
//       });
//     }
//     res.send({
//       message: "Client request found is:",
//       cust,
//       comment
//     });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };


exports.getOneClient=async(req,res,next)=>{
    const _id = req.query.id
    try {
        const cust = await UserForm.findOne({_id})
        const requestComment = await Comment.find({request:req.query.id})
        console.log("requestComment",requestComment)
        let comment = [];

        for(const c in requestComment){
          comment.push(requestComment[c].comment)
          // comment.push(requestComment[c].date)
         
        
          
        }
        // if(!article){
        //     res.send({message:'no article found'})
        // }  
        res.send({
            message: 'operation successful',
            cust,
            comment
        })
    } catch (error) {
        res.status(404).send({message:error.message});
    }
}
exports.deleteClient = async (req, res) => {
  try {
    const cust = await UserForm.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "Client request not found",
      });
    }

    await UserForm.deleteOne({ _id: req.query.id });
    res.send({
      message: " Client request deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateClient = async (req, res) => {
  // const images=req.files.id_image;
  //   const response=await uploader(images.tempFilePath) 
  const client = new UserForm({  
      _id: req.query.id,
    first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      occupation: req.body.occupation,
      country: req.body.country,
      province: req.body.province,
      district: req.body.district,
      sector: req.body.sector,
      cell: req.body.cell,
      branch_name: req.body.branch_name,
      water_usage: req.body.water_usage,
      plot_number: req.body.plot_number,
       id_type:req.body.id_type, 
      id_number: req.body.id_number,
      // id_image:response.secure_url,
      // passport_image:response.secure_url,
      passport: req.body.passport,
      issued_date: req.body.issued_date,
      expiry_date: req.body.expiry_date,
      // status:req.body.status,
     

  }); 

  UserForm.updateOne({ _id: req.query.id }, client)
    .then(() => {
      res.status(201).send({
        message: "Client request updated successfully",
        client,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

// exports.updateStatus = async (req, res) => {
//   const stat = new UserForm({ 
//      status: req.body.status 
//   });

//   UserForm.update({_id:req.query.id }, stat)
//     .then(() => {
//       res.status(201).send({
//         message: "Status updated successfully",
//         stat,
//       });
//     })
//     .catch((error) => {
//       res.status(400).send(error.message);
//     });
// };

exports.updateStatus = (req, res) => {  
  UserForm.findOneAndUpdate(
     { _id: req.body._id},
      { status: req.body.status } ,
     { new: true },
     (err, request) => {
     if (err) {
         return res.status(400).json({error: "Cannot update request status"});
     }
     res.json(request);
  });
};

exports.countClient = async (req,res) => {
  
  await UserForm.find().count().then((data)=>{
    
    res.status(200).send({
      message: " All request found are:",
      data,
    });
  }
  ) 
}
exports.countClientById = async(req, res) => {

  await UserForm.find({
      _id: req.query.id
  }).count().then((data) => {

      res.status(200).send({
          message: "Request found are:",
          data,
      });
  })
}
exports.getClientById = async (req, res) => {
  
  await UserForm.find({
      user_id: req.query.user_id
  }).populate("user_id", "name")
  .then((form) => {
    form.map((form) => {
      form._doc.id=form._id;
      delete form._doc._id;
      })
     
    res.send({
      message: "Request found are:",
      form,
    }); 
  });
};

exports.getClientByPending = async (req, res) => {
  
  await UserForm.find({
      status: "Pending"
  })
  .then((form) => {
     
    res.send({
      message: " Pending request found are:",
      form,
    }); 
  });
};
exports.getClientByApproved = async (req, res) => {
  
  await UserForm.find({
      status: "Approved"
  })
  .then((form) => {
     
    res.send({
      message: " Approved request found are:",
      form,
    }); 
  });
};
exports.getClientAll = async (req, res) => {
  
  await UserForm.find()
  .then((form) => {
     
    res.send({
      message: " All request found are:",
      form,
    }); 
  });
};
exports.getClientByReturned = async (req, res) => {
  
  await UserForm.find({
      status: "Returned"
  })
  .then((form) => {
     
    res.send({
      message: " Returned request found are:",
      form,
    }); 
  });
};
exports.getClientByCompleted = async (req, res) => {

  await UserForm.find({

      status: "Completed"
  })
  .then((form) => {

    res.send({
      message: " Completed request found are:",
      form,
    });
  });
};
exports.CountClientByUserId = async(req, res) => {

  await UserForm.find({
    user_id: req.query.user_id
}).count().then((data) => {
 
      res.status(200).send({
          message: "Request found are:",
          data,
      });
  })
}
exports.CountClientByStatusP = async(req, res) => {

  await UserForm.find({
    status:"Pending"
}).count().then((data) => {
 
      res.status(200).send({
          message: "Pending request found are :",
          data,
      });
  })
}

exports.CountClientByStatusA = async(req, res) => {

  await UserForm.find({
    status:"Proposed To Approve"
}).count().then((data) => {
 
      res.status(200).send({
          message: "Proposed to approve request found are:",
          data,
      });
  })
}
exports.CountClientByStatusR = async(req, res) => {
  
    await UserForm.find({
      status:"Returned"
  }).count().then((data) => {
  
        res.status(200).send({
            message: "Returned request found are:",
            data,
        });
    })
  }

exports.CountClientByStatusC = async(req, res) => {
  
    await UserForm.find({
      status:"Completed"
  }).count().then((data) => {
  
        res.status(200).send({
            message: "Completed request found are:",
            data,
        });
    })
  }




  // const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
// const connection = mongoose.createConnection("mongodb://localhost:27017/myDatabase", {useNewUrlParser: true});

// autoIncrement.initialize(connection);

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     age: { type: Number, required: true }
// });

// userSchema.plugin(autoIncrement.plugin, {
//     model: 'User',
//     field: '_id',
//     startAt: 1,
//     incrementBy: 1
// });

// const User = connection.model('User', userSchema);

// const newUser = new User({
//     name: 'John Doe',
//     age: 30
// });

// newUser.save((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(newUser._id); // Output: WASAC/WT/00001
//     }
// });


