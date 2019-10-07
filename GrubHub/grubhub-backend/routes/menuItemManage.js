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


router.get('/menu', function (req, res) {
  let menuList = [];
  const getMenu = async () => {
    let sectionsResult = {};
    let getSectionsResult = await LoginSignUpDBObj.getSections("restaurantSectionTable", req.query.restaurantId);
    if (getSectionsResult) {
      let sectionsForRestaurant = getSectionsResult[0];
      if (sectionsForRestaurant) {
        sectionsResult = {
          isLunch: sectionsForRestaurant.lunchSection,
          isBreakfast: sectionsForRestaurant.breakfastSection,
          isAppetizer: sectionsForRestaurant.appetizerSection,
        }
      } else {
        sectionsResult = {
          isLunch: false,
          isBreakfast: false,
          isAppetizer: false,
        }
      }
    }

    let getMenuResult = await LoginSignUpDBObj.getMenu("restaurantMenuTable", req.query.restaurantId);
    if (getMenuResult) {
      for (index = 0; index < getMenuResult.length; index++) {
        let anItem = getMenuResult[index];
        console.log("Got this from DB");
        console.log(anItem);
        resItem = {
          itemId: anItem.menuItemId,
          itemName: anItem.menuItemName,
          itemDesc: anItem.menuItemDesc,
          itemPrice: anItem.menuItemPrice,
          itemSection: anItem.menuItemSection,
          itemCuisine: anItem.menuItemCuisine,
        }
        menuList.push(resItem);
      }
    } else {
      res.status(500).json({
        responseMessage: 'Error while retreiving order details!',
        menu: undefined
      });
    }

    let getRestaurantDetails = await LoginSignUpDBObj.getRestaurantDetails("restaurantTable", req.query.restaurantId);
    if (getRestaurantDetails) {
      let detailsResult = getRestaurantDetails[0];
      if (detailsResult) {
        restaurantDetails = {
          restaurantId: req.query.restaurantId,
          restaurantName: detailsResult.restaurantName,
          restaurantEmailId: detailsResult.restaurantEmailId,
          restaurantCuisine: detailsResult.restaurantCuisine,
          restaurantPhone: detailsResult.restaurantPhone,
        }
      }
    }

    res.status(200).json({
      responseMessage: 'Found one or more items that matched',
      menu: menuList,
      sections: sectionsResult,
      restaurantDetails: restaurantDetails,
    })
  }

  try {
    getMenu();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Failed to place Order!' });
  }

});




/*
  * Call this endpoint from Buyer, when Buyer is placing an Order
  */
router.get('/menuItem', function (req, res) {
  let response = [];
  const getAllItemMatches = async () => {
    let getAllItemMatchesResult = await LoginSignUpDBObj.getAllItemMatches("restaurantMenuTable", req.query.menuItemName);
    if (getAllItemMatchesResult) {
      for (index = 0; index < getAllItemMatchesResult.length; index++) {
        let anItem = getAllItemMatchesResult[index];
        resItem = {
          itemName: anItem.menuItemName,
          itemDesc: anItem.menuItemDesc,
          itemPrice: anItem.menuItemPrice,
          itemSection: anItem.menuItemSection,
          itemCuisine: anItem.menuItemCuisine,
        }

        let restaurantId = anItem.restaurantId;
        let restaurantDetails = await LoginSignUpDBObj.getRestaurantDetails("restaurantTable", restaurantId);
        if (restaurantDetails.length > 0) {
          console.log(restaurantDetails[0]);
          resItem = {
            ...resItem,
            restaurantId: anItem.restaurantId,
            restaurantName: restaurantDetails[0].restaurantName,
            restaurantCuisine: restaurantDetails[0].restaurantCuisine,
          }
        } else {
          console.log("Query Result from query to restaurantTabel returned empty");
        }
        response.push(resItem);
      }
      res.status(200).json({
        responseMessage: 'Found one or more items that matched',
        matchedItems: response
      })
    } else {
      res.status(500).json({
        responseMessage: 'Error while retreiving order details!',
        matchedItems: undefined
      });
    }
  }

  try {
    getAllItemMatches();
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ responseMessage: 'Failed to place Order!' });
  }
});

/*
  * Call this end-point when restaurant needs to delete a section.
*/
router.post('/restaurantMenu', function (req, res) {

  var menuItemAddData = {
    menuItemName: req.body.menuItemName,
    menuItemDesc: req.body.menuItemDesc,
    menuItemImage: req.body.menuItemImage,
    menuItemPrice: req.body.menuItemPrice,
    menuItemSection: req.body.menuItemSection,
    restaurantId: req.body.restaurantId,
  }

  var addMenuItemQuery = [];
  const addMenuItem = async () => {
    addMenuItemQuery = await LoginSignUpDBObj.addMenuItem("restaurantMenuTable", menuItemAddData);
    console.log(addMenuItemQuery);
    if (addMenuItemQuery && addMenuItemQuery.affectedRows == 0) {
      res.status(500).json({
        responseMessage: 'Failed to add Item to Menu!'
      });
    } else {
      res.status(200).json({
        responseMessage: "Successfully Added Menu Item!",
        menuItemUniqueId: addMenuItemQuery.insertId
      });
    }
  }

  try {
    addMenuItem();
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
router.delete('/restaurantMenu', function (req, res) {

  let menuItemId = req.query.menuItemId;
  const deleteMenuItem = async () => {
    let deleteMenuItemQuery = await LoginSignUpDBObj.deleteMenuItem("restaurantMenuTable", menuItemId);
    if (deleteMenuItemQuery && deleteMenuItemQuery.affectedRows != 1) {
      res.status(404).json({
        responseMessage: 'Menu Item Not Found!'
      });
    } else {
      res.status(200).json({
        responseMessage: "Menu Item successfully Deleted!"
      });
    }
  }

  try {
    deleteMenuItem();
  }
  catch (err) {
    console.log(err);
    res.status(503).json({ responseMessage: 'Database not responding' });
  }
});

module.exports = router;