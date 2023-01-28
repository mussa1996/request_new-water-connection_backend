import mongoose from "mongoose";
const branchSchema = new mongoose.Schema({
    branch_code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
      },
      branch_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        
      },
});
const Branch = mongoose.model("branch", branchSchema);
export default Branch;