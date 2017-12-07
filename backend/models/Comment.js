var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    message:String,
    likes:Number,
    subComment:[{type:mongoose.Schema.Types.ObjectId,ref:"Subcomment"}],
    username:String,
    date:Date,
});
mongoose.model('Comment',CommentSchema);