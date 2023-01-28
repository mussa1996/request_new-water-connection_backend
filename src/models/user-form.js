import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
require("dotenv").config();

const userFormSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: 'WASAC/WT/00001'
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },

 
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  occupation:{
    type: String,
    trim: true,
    required:false
  },
  country:{
    type: String,
    trim: true,
    required:true
  },
  province:{
    type: String,
    trim: true,
    required:true
  },
  district:{
    type: String,
    trim: true,
    required:true
  },
  sector:{
    type: String,
    trim: true,
    required:true
  },
  cell:{
    type: String,
    trim: true,
    required:true
  },
  branch_name:{
    type: String,
    trim: true,
    required:true
  },
  water_usage:{
    type: String,
    trim: true,
    required:true
  },
  plot_number:{
    type: String,
    trim: true,
    required:true
  },
  creation_date:{
    type:Date,
    trim: true,
    default:Date.now()
  },
  id_type:{
    type: String,
    trim: true,
    required:false
  },
  id_number:{
    type: String,
    trim: true,
    required:false
  },
  passport:{
    type: String,
    trim: true,
    required:false
  },
  issued_date:{
    type: Date,
    trim: true,
    required:false
  },
  expiry_date:{
    type: Date,
    trim: true,
    required:false
  },

  id_image: {
    type: String,
    default: "default.jpg",
  },
  passport_image: {
    type: String,
    default: "default.jpg",
  },
  status:{
    type: String,
    required: true,
    default:"Pending"
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
// generate id 
userFormSchema.virtual('customId').get(function() {
  return `WASAC/WT/${this._id.toString().padStart(5, '0')}`;
});

//generating auth token
userFormSchema.methods.generateAuthToken = async function(){
  const user=this
 const token = jwt.sign({_id:user._id.toString(),role:user.role},process.env.SECRET_KEY,{expiresIn:'50m'})

  user.token = token
  await user.save();
  return token
}
//find if email and password are exists
userFormSchema.statics.findByCredentials = async(email,password)=>{
  const user = await UserForm.findOne({email})
  //console.log(user)
   if(!user){
       throw new Error('unable to login')
   }
   if(user.isVerified ===false){
       throw new Error('Account not verified')
   }
   const isMatch = await bcrypt.compare(password,user.password)
  
   if(!isMatch){
       throw new Error("password or email is incorrect")
   }
   return user
} 
//hash the plain text password
userFormSchema.pre('save', async function(next){
 const user = this
 if(user.isModified('password')){
     user.password = await bcrypt.hash(user.password, 8)
 }
 next() 
})
const UserForm= mongoose.model('user_form',userFormSchema)
module.exports = UserForm;