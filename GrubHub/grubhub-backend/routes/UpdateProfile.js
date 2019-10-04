const express = require('express');

const router = express.Router();

var fs = require('fs');
const multer = require('multer');
const mountRoutes = require('.');
const LoginSignUpDB = require('../database/LoginSignUpDB');
const LoginSignUpDBObj = new LoginSignUpDB();


router.post('/updateProfile', function (req, res) {
  console.log("Inside profile put request");
  console.log("Request Body in update buyer:");
  console.log(req.body);
  let emailId = req.body.emailId;
  let table = req.body.table;
  let id = req.body.id

  console.log("email Id and tablename "+req.body.emailId +"  "+req.body.table )

  var queryResult = [];
  var inputData = {
    "buyerName": req.body.buyerName,
    "emailId": req.body.emailId,
    "phonenumber": req.body.phoneNumber,
    "Address": req.body.Address,
    "id":req.body.id

  }
  console.log("in input data update buyer   " + inputData.buyerName)
  const getProfileData = async () => {
    queryResult = await LoginSignUpDBObj.updateBuyer(table, id, inputData);
    if (queryResult) {
      console.log("Data updated!");
      res.status(200).json(queryResult);
    }
    else {
      res.status(400).json({ responseMessage: 'Record not found' });
    }
  }
  try {
    getProfileData();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.post('/updateOwner', function (req, res) {
  console.log("Inside profile put request");
  console.log("Request Body in update Owner:");
  console.log(req.body);
  let emailId = req.body.emailId;
  let table = req.body.table;
  let id = req.body.id

  console.log("email Id and tablename "+req.body.emailId +"  "+req.body.table )

  var queryResult = [];
  var inputData = {
    "ownerName": req.body.ownerName,
    "emailId": req.body.emailId,
    "phonenumber": req.body.phoneNumber,
    "Address": req.body.Address,
    "restaurentName": req.body.restaurentName,
    "cuisine": req.body.cuisine,
    "id":req.body.id

  }
  console.log("in input data update buyer   " + inputData.ownerName)
  const getProfileData = async () => {
    queryResult = await LoginSignUpDBObj.updateOwner(table, id, inputData);
    if (queryResult) {
      console.log("Data updated!");
      res.status(200).json(queryResult);
    }
    else {
      res.status(400).json({ responseMessage: 'Record not found' });
    }
  }
  try {
    getProfileData();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});


router.get('/profile', function (req, res) {
  console.log("Inside profile get request");
  console.log("Request params:");
  console.log(req.query);
  let emailId = req.query.emailId;
  var queryResult = [];
  const getProfileData = async () => {
    queryResult = await LoginSignUpDBObj.checkIfUserExists(req.query.table, emailId);
    if (queryResult[0]) {
      if (queryResult[0].emailId != null) {
        console.log("Data Found!");
        let obj = queryResult[0];
        delete obj['password'];
        Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
        res.status(200).json(obj);
      }
    }
    else {
      res.status(400).json({ responseMessage: 'Record not found' });
    }
  }
  try {
    getProfileData();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});



// router.post('/img/upload', upload.single('selectedFile'), function (req, res) {
//   console.log("Inside post profile img");
//   console.log("Request body:");
//   console.log(req.body);
//   console.log("filename", req.file.filename);
//   let filename = req.file.filename;
//   var queryResult = [];

//   let id = req.body.id;
//   let role = req.body.role;
//   const addProfilePic = async () => {
//     queryResult = await profileDao.addProfilePic(role, id, filename);
//     if (queryResult) {
//       console.log("pic added");
//       res.status(200).json({ responseMessage: 'File successfully uploaded!' });
//     }
//     else {
//       res.status(400).json({ responseMessage: 'Record not found' });
//     }
//   }
//   try {
//     addProfilePic();
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ responseMessage: 'Database not responding' });
//   }
// });

// router.get('/profile/img', function (req, res) {
//   console.log("Inside profile get request");
//   console.log("Request params:");
//   console.log(req.query);
//   let id = req.query.id;
//   let role = req.query.role;
//   var queryResult = [];
//   let filename = '';
//   const getProfilepic = async () => {
//     queryResult = await profileDao.getProfilepic(role, id);
//     console.log(queryResult);
//     function base64_encode(file) {
//       var bitmap = fs.readFileSync(file);
//       return new Buffer(bitmap).toString('base64');
//     }
//     if (queryResult[0]) {
//       filename = queryResult[0].img;
//       console.log(filename);
//       let filePath = "C:/Users" + filename;
//         var base64str = base64_encode(filePath);
//         console.log(base64str);
//         res.status(200).json({ base64str: base64str });
//     }
//     else {
//       res.status(400).json({ responseMessage: 'Record not found' });
//     }
//   }
//   try {
//     getProfilepic();
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ responseMessage: 'Database not responding' });
//   }
// });


// router.put('/img', function (req, res) {
//   console.log("Inside put profile img");
//   console.log("Request body:");
//   console.log(req.body);
//   var queryResult = [];

//   let id = req.body.id;
//   let role = req.body.role;
//   const removeProfilePic = async () => {
//     queryResult = await profileDao.addProfilePic(role, id, null);
//     if (queryResult) {
//       console.log("pic removed");
//       res.status(200).json({ responseMessage: 'Image successfully removed!' });
//     }
//     else {
//       res.status(400).json({ responseMessage: 'Record not found' });
//     }
//   }
//   try {
//     removeProfilePic();
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ responseMessage: 'Database not responding' });
//   }
// });

module.exports = router;