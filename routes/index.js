var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'accounts'
});

db.connect((err) => {
  if (err) {
    console.log("database connect failed...");
  } else {
    console.log("database connected...");
  }
});

//var app = express();

router.post('/login',function(req,res){

  var Username= req.body.Username;
  var Password = req.body.Password;
  db.query('SELECT * FROM accounts WHERE Username = ?',[Username], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":200,
      "failed":"error ocurred"
    });
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Password does not exits"
          });
    }
  }
  });
});

router.post('/register',function(req,res){

  //console.log("req",req.body);
  var today = new Date();
  var users={
    "Username":req.body.Username,
    //"Email":req.body.Email,
    "Password":req.body.Password,
    "submit":req.body.submit
    // "created":today,
    // "modified":today
  };
  db.query('INSERT INTO accounts SET ?',users, function (error, results, fields) {
  if (error) {
   console.log("error ocurred",error);
    res.send({
      "code":200,
      "failed":"error ocurred"
    });
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":204,
      "success":"user registered sucessfully"
        });
  }
  });
});

module.exports = router;
