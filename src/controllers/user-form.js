import UserForm from "../models/user-form";
import uploader from "../helper/storage";
import { response } from "express";
exports.create = async (req, res) => {
  try {
    const images=req.files.id_image;
    const response=await uploader(images.tempFilePath)
    console.log("images path",response)
    const client = new UserForm({
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
      id_type: req.body.id_type,
      id_number: req.body.id_number,
      issued_authority: req.body.issued_authority,
      id_image: response.secure_url,
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

exports.getOneClient = async (req, res, next) => {
  try {
    const cust = await UserForm.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "Client request not found",
      });
    }
    res.send({
      message: "Client request found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
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
  const images=req.files.id_image;
    const response=await uploader(images.tempFilePath)
    console.log("images path",response)
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
      id_type: req.body.id_type,
      id_number: req.body.id_number,
      issued_authority: req.body.issued_authority,
      id_image:response.secure_url,
      passport: req.body.passport,
      issued_date: req.body.issued_date,
      expiry_date: req.body.expiry_date,
      status:req.body.status,
     

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

exports.countClient = async (req,res) => {
  
  await UserForm.find().count().then((data)=>{
    
    res.status(200).send({
      message: "request found are:",
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

