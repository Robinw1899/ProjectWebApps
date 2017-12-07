var mongoose = require('mongoose');

var TweetSchema = new mongoose.Schema({
    message:String,
    comments:[{type: mongoose.Schema.Types.ObjectId,ref:"Comment"}],
    likes:Number,
    username:String,
    date:Date,
    id:Number
});
mongoose.model('Tweet',TweetSchema);