var express = require('express');
var router = express.Router();
var assert = require('assert');
const mongoose = require("mongoose")
const BodyParser = require("body-parser");


const CONNECTION_URL = "mongodb+srv://cs252:cs252@planitdb-dvbrl.mongodb.net/test?retryWrites=truee";
var connector;

router.use(BodyParser.json());
router.use(BodyParser.urlencoded({ extended: true }));


async function findUser(username) {
  return await User.findOne({ username })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("mainpage")
});

router.get('/get-data', function(req, res, next){

});

router.post('/signup', function(req, res, next){
  
  console.log(req.body);
  
  var user = {
    username: req.body.username,
    password: req.body.password,
    created: Date(Date.now())
  };

  // ;(async () => {

      connector = mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true }, function(err, db){
        assert.equal(null, err);

        db.collection('user').findOne({username: req.body.username}, function(err, result){
          if(err) throw err;
          if(result){
            console.log('found')
          }
          else {
            console.log('not found')

            db.collection('user').insertOne(user, function(err, result) {
              assert.equal(null, err);
              console.log('Item inserted');
              res.redirect('/');
              // alert("Successfully signed up!");
              db.close();
            });
          }
        })

        // db.collection('user').insertOne(user, function(err, result) {
        //   assert.equal(null, err);
        //   console.log('Item inserted');
        //   res.redirect('/');
        //   // alert("Successfully signed up!");
        //   db.close();
        // });
      })
    
  });
  

router.get('/signin', function(req, res, next){

  

  res.render("joinevent")
});

module.exports = router;
