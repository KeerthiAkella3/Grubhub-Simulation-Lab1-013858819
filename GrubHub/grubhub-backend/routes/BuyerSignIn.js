const express = require('express');
const mountRoutes = require('.');
const sha1 = require('sha1');
const LoginSignUpDB = require('../database/LoginSignUpDB');
const LoginSignUpDBObj = new LoginSignUpDB();


var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

router = express.Router();


router.post('/buyerSignIn',function (req, res) {
  console.log("Inside login post request");
  console.log("Request Body:");
    console.log(req.body);
    formatEmail = req.body.emailId.toLowerCase().trim();
    console.log("formatted email:"+formatEmail);
    let password = req.body.password;
    //console.log(password);
    let encryptedPassword = sha1(password);
    //console.log("Encrypted password: "+encryptedPassword);
  
    let queryResult = [];
    const checkuser = async () => {
     // console.log("in buyer sign in " + req.body.emailId)
    queryResult = await LoginSignUpDBObj.login("buyerTable", formatEmail , encryptedPassword);
    console.log("query result "+queryResult[0].buyerName);
    
  if (!queryResult[0]){
    console.log("Unable to find user");
    res.status(200).json({validUser: false});
  } else {
  if (queryResult[0].buyerName != null) {
    console.log("User exists! Valid credentials");
    res.cookie('cookie1',formatEmail,{maxAge: 900000, httpOnly: false, path : '/'});
    res.cookie('cookie2',queryResult[0].buyerId,{maxAge: 900000, httpOnly: false, path : '/'});
    res.cookie('cookie3',queryResult[0].buyerName,{maxAge: 900000, httpOnly: false, path : '/'});
    console.log("Added cookies");
    req.session.formatEmail = queryResult[0].emailId;
    res.status(200).json({validUser: true});
  } 
  }
    }
    try{
      checkuser();
    }
    catch(err){
      console.log("unable to read the database");
       res.status(500).json({responseMessage: 'Database not responding'});
    }
});

module.exports = router;