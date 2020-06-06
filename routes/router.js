var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Comment = require('../models/op');
var Anonymous = require('../models/anonymous');
const methodOverride = require('method-override');
const start = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');


var username = '';
router.use(methodOverride('_method'));
//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        res.json({ username: user.username });
        // return res.redirect('/profile');
        //res.json
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        username = user.username;
        return res.json({ username: user.username });
        //res.json
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

router.get('/user', function (req, res) {
  res.json({ username: username })
});


router.post('/test', function (req, res, next) {
  console.log(req.body.name)
  //console.log(req.params.id)
})

router.get('/test', function (req, res, next) {

  res.json({ id: "123" })
})

router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        username = "";
        return res.jsonp({ "username": username });
      }
    });
  }
});

router.post('/addcomment', function (req, res, next) {
  var commentData = {
    Text: req.body.Text,
    date: start,
    username: req.body.username,
  }
  Comment.create(commentData, function (error, comment) {
    if (error) {
      console.log(error)
    } else {
      res.jsonp({
        commentData
      })
    }
  });
})

router.get('/addcomment', function (req, res, next) {
  Comment.find({}, function (err, comment) {
    //console.log(comment)
    res.jsonp({
      comment
    })
  })
});

router.put('/addcomment/:id', function (req, res, next) {
  console.log(req.body.comment)
  Comment.findByIdAndUpdate(req.body.edit_comment, {
    $set: {
      Text: req.body.comment
    }
  }, (err, result) => {
    if (err) return console.log(err)
    res.jsonp({
      result
  })
  })
})

router.delete('/addcomment/:id', function (req, res, next) {
  Comment.findByIdAndDelete(req.body._method, (err, result) => {
    if (err) return res.send(err)
    res.jsonp({
      result
  })
  })
})

//anonymous

router.post('/addanonymous', function (req, res, next) {
  var anonymousData = {
    Text: req.body.anonymous,
    date: start,
    username: req.body.username,
  }
  Anonymous.create(anonymousData, function (error, anonymous) {
    if (error) {
      console.log(error)
    } else {
      res.jsonp({
        anonymousData
      })
    }
  });
})

router.get('/addanonymous', function (req, res, next) {
  Anonymous.find({}, function (err, anonymous) {
    //console.log(comment)
    res.jsonp({
      anonymous
    })
  })
});

router.put('/addanonymous/:id', function (req, res, next) {
  console.log(req.body.anonymous)
  Anonymous.findByIdAndUpdate(req.body.edit_anonymous, {
    $set: {
      Text: req.body.anonymous
    }
  }, (err, result) => {
    if (err) return console.log(err)
    res.jsonp({
      result
  })
  })
})

router.delete('/addanonymous/:id', function (req, res, next) {
  Anonymous.findByIdAndDelete(req.body._method, (err, result) => {
    if (err) return res.send(err)
    res.jsonp({
      result
  })
  })
})

module.exports = router;