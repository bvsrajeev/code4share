var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');
var transporter =nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code U share', caption: 'Every thing that you need to know' });
});

router.get('/about',function(req,res,next){
  res.render('about',{title:'codeUshare-a platform for sharing code'});
});

router.route('/contact')
.get(function(req,res,next){
  res.render('contact',{title:'codeUshare-a platform for sharing code'});
})
.post(function(req,res,next){
  req.checkBody('name','name should not be empty').notEmpty();
  req.checkBody('email','inavlid email').isEmail();
  req.checkBody('message','message should not be empty').notEmpty();
  var errors = req.validationErrors();

  if(errors){
    res.render('contact',{
      title: 'code U share-a platform for sharing code',
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      errorMessages: errors
    });
  }
  else{
    var mailOptions = {
      from: 'Code U share <no-reply@code U share.com>',
      to: req.body.email,
      subject: 'You got a new message',
      text: req.body.message
    };
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        return console.log(error);
      }
      res.render('thank',{title:'code U share-a platform for sharing code'});
    });
    //res.render('thank',{title:'code U share-aplatform for sharing code'});
  }
});




module.exports = router;
