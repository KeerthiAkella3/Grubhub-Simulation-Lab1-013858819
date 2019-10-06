const express = require('express');

const router = express.Router();

var fs = require('fs');
const multer = require('multer');
const mountRoutes = require('.');
const LoginSignUpDB = require('../database/LoginSignUpDB');
const LoginSignUpDBObj = new LoginSignUpDB();
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/profilePictures');
  },
  filename: (req, file, callback) => {
    fileExtension = file.originalname.split('.')[1];
    console.log("fileExtension", fileExtension);
    callback(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + fileExtension);
  },
});

var upload = multer({ storage: storage });


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


router.post('/img/upload', upload.single('selectedFile'), function (req, res) {
  console.log("Inside post profile img");
  console.log("Request body:");
  console.log(req.body);
  console.log("filename", req.file.filename);
  let filename = req.file.filename;
  var queryResult = [];

  let id = req.body.id;
  let table = req.body.table;
  const addProfilePic = async () => {
    queryResult = await LoginSignUpDBObj.addProfilePic(table, id, filename);
    if (queryResult) {
      console.log("pic added");
      res.status(200).json({ responseMessage: 'File successfully uploaded!' });
    }
    else {
      res.status(400).json({ responseMessage: 'Record not found' });
    }
  }
  try {
    addProfilePic();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});

router.get('/profile/img', function (req, res) {
  console.log("Inside profile get request");
  console.log("Request params:");
  console.log(req.query);
  let id = req.query.id;
  let table = req.query.table;
  

  var queryResult = [];
  let filename = '';
  const getProfilepic = async () => {
    queryResult = await LoginSignUpDBObj.getProfilepic(table, id);
    console.log("queryResult ");
    console.log(queryResult.image)
    function base64_encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString('base64');
    }
    if (queryResult) {
      filename = queryResult.image;
      console.log("filename")
      console.log(filename);
      let filePath = path.join(__dirname, "../uploads/profilePictures", filename);
      console.log("file path.."+filePath);
      //let filePath = "/Users/Keerthy/Desktop/Fall/273/HW/Lab1/Lab-013858819/Lab1-013858819/GrubHub/grubhub-backend/uploads/profilePictures/" + filename;
        var base64str = base64_encode(filePath);
        console.log(base64str);
        res.status(200).json({ base64str: base64str });
    }
    else {
      res.status(400).json({ responseMessage: 'Record not found' });
    }
  }
  try {
    getProfilepic();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Database not responding' });
  }
});



module.exports = router;