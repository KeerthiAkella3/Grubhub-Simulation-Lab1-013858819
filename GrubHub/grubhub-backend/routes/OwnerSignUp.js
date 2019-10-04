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


router.post('/ownerSignUp',function (req, res) {
  console.log("Inside owner signup post request");
  console.log("Request Body:");
  console.log(req.body);
  let password = req.body.password;
  console.log(password);
  let encryptedPassword = sha1(password);
  console.log("Encrypted password: "+encryptedPassword);
  var queryResult = [];
  const createUserIfNotPresent = async () => {
    queryResult = await LoginSignUpDBObj.checkIfEmailExists("ownerTable",req.body.emailId);
    console.log(queryResult);
    if(queryResult[0]){
      if(queryResult[0].email != null){
        console.log("User already exists!");
        res.status(200).json({responseMessage: 'User already exists!'});
      }
    }

  //   ownerId INT NOT NULL AUTO_INCREMENT,
	// ownerName VARCHAR(100) NOT NULL,
	// ownerEmailId VARCHAR(40) NOT NULL,
	// ownerPassword VARCHAR(100) NOT NULL,
	// restaurentName VARCHAR(40) NOT NULL,
  //   Address int(5) NOT NULL,
	// cuisine VARCHAR(40) NOT NULL,
  //   phoneNumber
    else{
      var inputData = {
        "ownerName": req.body.ownerName,
        "emailId": req.body.emailId,
        "userPassword": encryptedPassword,
        "phoneNumber": req.body.phoneNumber,
        "restaurentName": req.body.restaurentName,
        "Address":req.body.Address,
        "cuisine": req.body.cuisine

      }
      queryResult = await LoginSignUpDBObj.createNewUser("ownerTable",inputData);
      console.log("User Added");
      res.status(200).json({responseMessage: 'Successfully Added!'});
    }
  }

  try{
    createUserIfNotPresent();
  }
  catch(err){
    console.log(err);
    res.status(500).json({responseMessage: 'Database not responding'});
  }
 
});

module.exports = router;


 
  