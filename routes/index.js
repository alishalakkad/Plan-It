var express = require('express');
var router = express.Router();
var assert = require('assert');
const mongoose = require("mongoose")
const BodyParser = require("body-parser");
const userSchema = require('../userSchema.js')
const User = mongoose.model('user', userSchema, 'user')

var url = 'mongodb://localhost:27017/test'
const CONNECTION_URL = "mongodb+srv://cs252:cs252@planitdb-dvbrl.mongodb.net/test?retryWrites=truee";
var connector;

router.use(BodyParser.json());
router.use(BodyParser.urlencoded({ extended: true }));

async function createUser(username, password) {
  return new User({
    username,
    password,
    created: Date.now()
  }).save()
}

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
  // var username = document.getElementById("username").value;
  // var password = document.getElementById("pass").value;
  console.log("hehehehhehehhe")
  console.log(req);
  ;(async () => {

      connector = mongoose.connect(CONNECTION_URL, function(err, db){
        assert.equal(null, err);
      })

      let user1 = await connector.then(async () => {
        return findUser(req.body.username)
      })
        
    if (!user1) {
        user = await createUser(req.body.username, req.body.password)
    }
  })
});

router.get('/update', function(req, res, next){

});

router.get('/delete', function(req, res, next){

});

module.exports = router;
