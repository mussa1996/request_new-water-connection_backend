import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
require("dotenv").config();
const userSchema = new mongoose.Schema({
  fullname: {
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

 
  password: {
    type: String,
    trim: true,
    minlength: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  token: {
    type: String,
  },

 
  role: {
    type: String,
    required: true,
    default: "user",
  },
});
//generating auth token
userSchema.methods.generateAuthToken = async function(){
  const user=this
 const token = jwt.sign({_id:user._id.toString(),role:user.role,fullname:user.fullname},process.env.SECRET_KEY,{expiresIn:'50m'})

  user.token = token
  await user.save();
  return token
}
//find if email and password are exists
userSchema.statics.findByCredentials = async(email,password)=>{
  const user = await User.findOne({email})
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
userSchema.pre('save', async function(next){
 const user = this
 if(user.isModified('password')){
     user.password = await bcrypt.hash(user.password, 8)
 }
 next() 
})
const User= mongoose.model('user',userSchema)
module.exports = User;