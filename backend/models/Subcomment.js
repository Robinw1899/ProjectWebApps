var mongoose = require('mongoose');

var SubCommentSchema = new mongoose.Schema({
    message:String,
    likes:Number
});
mongoose.model('Subcomment',SubCommentSchema);