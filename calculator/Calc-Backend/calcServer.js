const express = require('express');

var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

router = express.Router();

router.post('/server', function(req,res){
    console.log("in server page")
    let input = req.body.input;
    let result = eval(input);
    if(!isNaN(result)){
      result = Number((result).toFixed(5));
    }
    console.log("Result:"+result);
    res.send({"result": result});
})

module.exports = router;