import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
require("dotenv").config();
const userSchema = new mongoose.Schema({
  item_description: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  item_man: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },

  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  quantity_man: {
    type: Number,
    required: true,
    trim: true,
  },
  unit_price: {
    type: Number,
    required: true,
    trim: true,
  },
  unit_price_man: {
    type: Number,
    required: true,
    trim: true,
  },

 
  total_price: {
    type: Number,
    trim: true,
    required: true,
  },
  total_price_man: {
    type: Number,
    trim: true,
    required: true,
  },
  totalI:{
    type: Number,
    trim: true,
 },
  
 totalIII:{
  type: Number,
  trim: true,
},

  vat: {
    type: Number,
    trim: true,
  }, 
  total_all: {
    type: Number, 
    trim: true,
  },
  approved_by:{
    type: String,
    trim: true,
  },
  verified_by:{
    type: String,
    trim: true,
  },
  prepared_by:{
    type: String,
    trim: true,
  },
  
  request_id: {
    type: String,
    ref: "user_form",
    required: true,
  },
});

const Billing= mongoose.model('billing',userSchema)
module.exports = Billing;