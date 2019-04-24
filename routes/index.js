var express = require('express');
var router = express.Router();
var assert = require('assert');
const mongoose = require("mongoose")
const BodyParser = require("body-parser");
const mongodb = require('mongodb')
const path = require('path')

var found = 0;
var nameofevent = "";

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
  // res.sendFile(path.join(__dirname, "../mainpage.html"))
});

router.get('/event', function(req, res, next){
    res.render("joinevent")
});

router.get('/planner', function(req, res, next){
  res.render("planner")
});

// router.get('/eventcode', function(req, res, next){
//   var code;
//   mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function(err, db){
//     assert.equal(null, err);
//     var cursor = db.collection("event").findOne();
//     cursor.forEach(function(doc, err){
//       assert.equal(null, err);
//       resultArray.push(doc);
//     }, function(){
//       db.close();
//       res.render('planner', {items: resultArray});
//     })
//   })
// })

router.get('/get-tasks', function(req, res, next){
  var resultArray = [];
  mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection("tasks").find();
    console.log(nameofevent)
  //  var evname = db.collection("event").
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      db.close();
      res.render('planner', {items: resultArray, item: nameofevent});
    })
  })
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

  router.get('/get-signin', function(req, res, next){
    var resultArray = [];
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function(err, db){
      assert.equal(null, err);
      var cursor = db.collection("user").find();
      cursor.forEach(function(doc, err){
        assert.equal(null, err);
        resultArray.push(doc.username+";"+doc.password);
      }, function(){
        db.close();
        res.render('mainpage', {usercollection: resultArray});
      })
    })
  })

  router.get("/event", function(req, res, next){
    console.log("my name is anthony gonzolvas")
      res.render("joinevent")
  });

 router.post('/signin', function(req, res){

  // var MongoClient = mongodb.MongoClient;
 
    // Define where the MongoDB server is
    // var url = 'mongodb://localhost:27017/sampsite';
 
    // Connect to the server
    mongoose.connect(CONNECTION_URL, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
 
        // Get the documents collection
        // var collection = db.collection('user');
 
        // Get the student data passed from the form
 
        // Insert the student data into the database
        db.collection('user').findOne({username: req.body.username, password: req.body.password}, function(err, result){
          if(err) throw err;
          if(result){
            console.log('found')
            // db.close();

            // router.render('/event', function(err, html){
            //   res.sendFile(path.join(__dirname, "../joinevent.html"))
            // });
            
            res.send(result);
            console.log("sent result!")
       //     location.href('../joinevent.html')
          }
          else {
            console.log('not found')
            // res.send(null);
          }
          db.close();
          
        })
 
      }
    });
  })

  // console.log(req.body.username + "   wlrkngwlrgnlwr")
  //  connector = mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true }, function(err, db){
  //    assert.equal(null, err);
  //    db.collection('user').findOne({username: req.body.username, password: req.body.password}, function(err, result){
  //      if(err) throw err;
  //      if(result){
  //        console.log('found')
  //        db.close();
  //        res.redirect("event");     
  //        }
  //      else {
  //        console.log('not found')
  //      }
  //      db.close();
      
  //    })

    //  res.redirect(303, "/event"); 
// });
    //rest of code 

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


    



router.post('/createtask', function(req, res, next){
  var task = {
    task: req.body.task,
    person: req.body.person
  };
  console.log(task)

      connector = mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true }, function(err, db){
        assert.equal(null, err);

            db.collection('tasks').insertOne(task, function(err, result) {
              assert.equal(null, err);
              console.log('Task inserted');
              
              // res.jsonp({success : true})
              // alert("Successfully signed up!");
              
              // console.log(db.collection('event').find({name:req.body.eventname}));
              db.close();
            });
      })
});

router.post('/createevent', function(req, res, next){
  
  console.log(req.body);
  // var id = Math.floor(Math.random()*90000) + 10000;
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
  
  var val;
  var event = {
    name: req.body.eventname,
    eventId: req.body.id,
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
      
      // return id;
      // res.redirect('/');
    
  });

module.exports = router;
