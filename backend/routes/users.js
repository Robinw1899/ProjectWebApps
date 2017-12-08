var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = mongoose.model('User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/*register a user*/
router.post('/register', function (req, res, next) {

  if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.email || !req.body.birthdate) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }

  var user = new User();
  user.username = req.body.username;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.birthdate = req.body.birthdate;
  user.setPassword(req.body.password)
  user.save(function (err) {
    if (err) { return next(err); }
    return res.json({ token: user.generateJWT() })
  });
  console.log(user);
});

/*login with a user */
router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

/*check if username alreadt exists*/
router.post('/checkusername', function (req, res, next) {
  // if (req.body.username) {
  User.find({ username: req.body.username }, function (err, result) {
    if (result.length) {
      res.json({ 'username': 'alreadyexists' })
    } else {
      res.json({ 'username': 'ok' })
    }
  });
  // }
});

/*get user*/
router.get('/profile/:username', function (req, res, next) {
  let query = User.findOne({ username: req.params.username });
  query.exec(function (err, us) {
    if (err) { return next(err); }
    if (!us) { return new Error('User bestaat niet') }
    res.json(us);
  });
});

/*patch user*/
router.put('/profile/put/:username', function (req, res, next) {
  console.log(req.body);
  console.log(req.params.username);
  let query = User.findOneAndUpdate({ username: req.params.username }, {
    $set: {
      firstname : req.body.firstName,
      lastname : req.body.lastName,
      email : req.body.email,
      description : req.body.description,
    }
  }, function (err, result) {
    if (err) { return next(err); }
    res.json(true)
  });

});

module.exports = router;
