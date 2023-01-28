import mongoose from'mongoose';
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },

    date: {
        type: Date,
        default: Date.now
    },

    request: {
        type: String,
        ref: "user_form",
        required: true,
    },
});
const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;