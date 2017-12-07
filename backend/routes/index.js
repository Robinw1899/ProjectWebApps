var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Tweet = mongoose.model('Tweet');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let Subcomment = mongoose.model('Subcomment');

let jwt  = require('express-jwt');

let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});

/* GET home page. */
router.get('/API/Tweets/', function(req, res, next) {
  let query = Tweet.find().populate({
      path:'comments',
      model:'Comment',
      populate:{
        path:'subComment',
        model:'Subcomment'
      }
    }
  );
  query.exec(function(err,tl){
    if(err){return next(err);}
    if(!tl){return new Error('Tweets bestaat niet')}
    res.json(tl);
  });
});

//posting tweet
router.post('/API/Tweet/', function (req, res, next) {
  console.log(req.body);
  //Tweet = new Tweet(req.body);
  let tweet = new Tweet(req.body);
 
  tweet.save(function(err,tw){
    if (err){ return next(err); }
    res.json(tw);
  })
 
});    

// get tweet with id
router.get('/API/Tweet/:id/',function(req,res,next){
  let query = Tweet.findById(req.params.id).populate({
    path:'comments',
    model:'Comment',
    populate:{
      path:'subComment',
      model:'Subcomment'
      }
    }
  );
  query.exec(function(err,tw){
    if(err){return next(err);}
    if(!tw){return new Error('Tweet bestaat niet')}
    res.json(tw);
  });
});


// post comment on tweet with id
router.post('/API/Comment/:id',function(req,res,next){
  console.log(req.body);
  Tweet.findById(req.params.id,function(err,t){
    if(err) return next(err);
    if(!t) return next(new Error('Tweet niet gevonden'));
    var comment = new Comment(req.body);
    comment.save(function(err,c){
      if(err) return next(err);
      t.comments.push(c);
      t.save(function(err,tw){
        if(err) return next(err);
        res.json(tw);
      });
    });
  });
});



//post subcomment on a comment with id
router.post('/API/Subcomment/:id',function(req,res,next){
  Comment.findById(req.params.id,function(err,c){
    if(err) return next(err);
    if(!c) return next(new Error('Comment niet gevonden'));
    var subcomment = new Subcomment(req.body);
    subcomment.save(function(err,sc){
      if(err) return next(err);
      c.subComment.push(sc);
      c.save(function(err,co){
        if(err) return next(err);
        res.json(co);
      });
    });
  });
});

/*like een tweet met id*/ 
router.patch('/API/Tweet/like/:id',auth,function(req,res,next){
  let query = Tweet.findById(req.params.id);
  query.exec(function(err,tw){
    if(err){return next(err);}
 
    tw.likes = tw.likes +1;

    tw.save(function(err, req) {
      if (err){ return next(err); }
      res.json(req);
    });
  })
});

/*dislike een tweet met id*/ 
router.patch('/API/Tweet/dislike/:id',auth,function(req,res,next){
  let query = Tweet.findById(req.params.id);
  query.exec(function(err,tw){
    if(err){return next(err);}
 
    tw.likes = tw.likes -1;

    tw.save(function(err, req) {
      if (err){ return next(err); }
      res.json(req);
    });
  })
});

module.exports = router;
