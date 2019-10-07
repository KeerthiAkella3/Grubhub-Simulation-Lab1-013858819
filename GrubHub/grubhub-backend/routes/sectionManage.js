const express = require('express');
const mountRoutes = require('.');
const LoginSignUpDB = require('../database/LoginSignUpDB');
const LoginSignUpDBObj = new LoginSignUpDB();


var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

router = express.Router();

/*
  * Call this end-point when restaurant needs to delete a section.
*/
router.post('./restaurantSection', function (req, res) {

  var addSectionQueryData = {
    restaurantId: req.body.restaurantId,
    lunchSection: req.body.menuItemDescName,
    appetizerSection: req.body.menuItemImage,
    breakfastSection: req.body.menuItemPrice,
  }

  var addSectionQuery = [];
  const addSection = async () => {
    addSectionQuery = await LoginSignUpDBObj.addSection("restaurantSectionTable", addSectionQueryData);
    if (addSectionQuery && addSectionQuery.insertId) {
      res.status(404).json({
        responseMessage: 'Order Not Found!'
      });
    } else {
      res.status(200).json({
        responseMessage: "Order successfully Deleted!",
        sectionId: addSectionQuery.insertId
      });
    }
  }

  try {
    addSection();
  }
  catch (err) {
    console.log(err);
    res.status(503).json({ responseMessage: 'Database not responding' });
  }
});

/*
  * Call this endpoint from Restaurant Owner, when restaurant Owner is managing status of order
  * From new --> preparing --> ready --> delivered.
  */
router.delete('/restaurantSection', function (req, res) {

  var deleteSectionData = {
    sectionId: req.body.sectionId,
  }

  var sectionDeleteQuery = [];
  const deleteSection = async () => {
    sectionDeleteQuery = await LoginSignUpDBObj.deleteSection("restaurantSectionTable", menuItemDeleteData);
    if (sectionDeleteQuery && sectionDeleteQuery.affectedRows) {
      res.status(404).json({
        responseMessage: 'Section Not Found!'
      });
    } else {
      res.status(200).json({
        responseMessage: "Section successfully Deleted!"
      });
    }
  }

  try {
    deleteSection();
  }
  catch (err) {
    console.log(err);
    res.status(503).json({ responseMessage: 'Database not responding' });
  }
});

module.exports = router;