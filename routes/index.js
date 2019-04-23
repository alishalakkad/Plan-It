var express = require('express');
var router = express.Router();
var assert = require('assert');
const mongoose = require("mongoose")
const BodyParser = require("body-parser");
var found = 0;


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

router.get('/event', function(req, res, next){
    res.render("joinevent")
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
              // res.jsonp({success : true})
              res.redirect('/');
              // alert("Successfully signed up!");
              db.close();
            });
          }
        })
      })
    
  });

  // router.get('/signin', function(req, res, next){
  //   res.redirect("/event")
  // });

  router.get("/event", function(req, res, next){
      res.render("joinevent")
  });

router.get('/signin', function(req, res, next){
  console.log('inside')

  console.log(req)

  // console.log(req.body)

  // connector = mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true }, function(err, db){
  //   assert.equal(null, err);

  //   db.collection('user').findOne({username: req.body.username, password: req.body.password}, function(err, result){
  //     if(err) throw err;
  //     if(result){
  //       console.log('found')
  //       db.close();
  //       return res.redirect("/event");
  //  //     location.href('../joinevent.html')
  //     }
  //     else {
  //       console.log('not found')
  //     }
  //     db.close();
      
  //   })
  // })

    

});

router.post('/createevent', function(req, res, next){
  
  console.log(req.body);
  var id = Math.floor(Math.random()*90000) + 10000;
  var unique = 0;
  // connector = mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true }, function(err, db){
  //     assert.equal(null, err);
  //     while(unique == 0){
  //       db.collection('user').findOne({username: req.body.username, password: req.body.password}, function(err, result){
  //         if(err) throw err;
  //         if(result){
  //           id = Math.floor(Math.random()*90000) + 10000;
  //         }
  //         else {
  //           unique = 1;
  //         }
  //         console.log("hello")
  //     })
  //   }
  // })
  console.log(id);

  async function returnid(id){
    return id;
  }

  var val;
  var event = {
    name: req.body.eventname,
    eventId: id,
    members: ""
  };
  console.log(event)

      connector = mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true }, function(err, db){
        assert.equal(null, err);

            db.collection('event').insertOne(event, function(err, result) {
              assert.equal(null, err);
              console.log('Event inserted');
              
              // res.jsonp({success : true})
              // alert("Successfully signed up!");
              
              // console.log(db.collection('event').find({name:req.body.eventname}));
              db.close();
            });
      })
      // let user = await connector.then(async () => {
      //   console.log("coming here")
      //   return returnid(id);
      // })
      
      return id;
      // res.redirect('/');
    
  });

module.exports = router;
