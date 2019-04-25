var express = require('express');
var router = express.Router();
var assert = require('assert');
const mongoose = require("mongoose")
const BodyParser = require("body-parser");
const mongodb = require('mongodb')
const path = require('path')

var found = 0;
var nameofevent = "";
var curruser = "";
var eventsId = 0;
var membersofevents = [];

const CONNECTION_URL = "mongodb+srv://cs252:cs252@planitdb-dvbrl.mongodb.net/test?retryWrites=truee";
var connector;

router.use(BodyParser.json());
router.use(BodyParser.urlencoded({ extended: true }));


async function findUser(username) {
  return await User.findOne({ username })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("mainpage")
  // res.sendFile(path.join(__dirname, "../mainpage.html"))
});

// router.get('/event', function(req, res, next){
//     res.render("joinevent")
// });

router.get('/planner', function (req, res, next) {
  res.render("planner")
});


router.get('/get-tasks', function (req, res, next) {
  var resultArray = [];
  var doneTasks= [];
  console.log('eid: '+eventsId)
  mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function (err, db) {
    assert.equal(null, err);

    db.collection("event").findOne({eventId: eventsId}, function(err, result){
      if (err) throw err;
      if (result) {
        console.log('found the event')
     //   console.log(result.members)
     //   console.log(curruser)
     membersofevents = result.members;

     if(membersofevents.includes(curruser)){
       //do nothing
     }
     else {
      membersofevents.push(curruser)
     }
     
     console.log(membersofevents)
  
     db.collection("event").updateOne({eventId: eventsId},{$set : {members: membersofevents}}, function(err, result){
       if(err) throw err
       if(result) {
         console.log('updated')
       }
       else {
         console.log('not updated')
       }
     })

      }
      else {
        console.log('not found')
    }
   });

  

    var cursor = db.collection("tasks").find({ eventcode: eventsId });
    var cursor2 = db.collection("tasksDone").find({ eventcode: eventsId });
    cursor2.forEach(function (doc, err) {
      assert.equal(null, err);
      doneTasks.push(doc);
    })
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function () {
   //   db.close();
      res.render('planner', { items: resultArray, item: nameofevent, evId: eventsId , doneTasks: doneTasks, listofmems: membersofevents });
    })
  })
});



router.post('/signup', function (req, res, next) {

//  console.log(req.body);

  var user = {
    username: req.body.username,
    password: req.body.password,
    created: Date(Date.now())
  };

  // ;(async () => {

  connector = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function (err, db) {
    assert.equal(null, err);

    db.collection('user').findOne({ username: req.body.username }, function (err, result) {
      if (err) throw err;
      if (result) {
        console.log('found')
      }
      else {
        console.log('not found')

        db.collection('user').insertOne(user, function (err, result) {
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

router.get('/get-signin', function (req, res, next) {
  var resultArray = [];
  mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function (err, db) {
    assert.equal(null, err);
    var cursor = db.collection("user").find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc.username + ";" + doc.password);
    }, function () {
      db.close();
      res.render('mainpage', { usercollection: resultArray });
    })
  })
})

router.get("/event", function (req, res, next) {
  console.log("my name is anthony gonzolvas")
  res.render("joinevent", { curname: curruser })
});


router.post('/signin', function (req, res) {
 
    // Connect to the server
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function(err, db){
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

            curruser = req.body.username
            console.log(result)
            res.send(result);
            console.log("sent result!")
       //     location.href('../joinevent.html')
          }
          else {
            console.log('not found')
           //  res.send("null");
          }
          db.close();
          
        })
 
      }
    });
  })

router.post('/createtask', function (req, res, next) {
  var task = {
    task: req.body.task,
    person: req.body.person,
    eventcode: req.body.eventcode
  };
  console.log(task)

  connector = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function (err, db) {
    assert.equal(null, err);

    db.collection('tasks').insertOne(task, function (err, result) {
      assert.equal(null, err);
      console.log('Task inserted');
      res.send("sent!")

      // res.jsonp({success : true})
      // alert("Successfully signed up!");

      // console.log(db.collection('event').find({name:req.body.eventname}));
      db.close();
    });
  })
});

router.post('/joineventpage', function (req, res) {
      console.log(req.body)
    // Connect to the server
    mongoose.connect(CONNECTION_URL,  { useNewUrlParser: true }, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
 
        db.collection('event').findOne({eventId: parseInt(req.body.eventcode)}, function(err, result){
          if(err) throw err;
          if(result){
       //     console.log('event found')
         //   console.log(parseInt(req.body.eventcode))
            nameofevent = result.name
            eventsId = parseInt(req.body.eventcode)
            res.send(result);
            //console.log(result.name)
          }
          else {
            console.log('event not found')
         //   res.send(result)
          }
          db.close();
          
        })
 
      }
    });
  })


router.post('/createevent', function (req, res, next) {

  console.log(req.body);
  // var id = Math.floor(Math.random()*90000) + 10000;
  var unique = 0;

  var val;
  var event = {
    name: req.body.eventname,
    eventId: req.body.id,
    members: []
  };
  console.log(event)

  connector = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, function (err, db) {
    assert.equal(null, err);

    db.collection('event').insertOne(event, function (err, result) {
      assert.equal(null, err);
      console.log('Event inserted');
      nameofevent = req.body.eventname
      eventsId = req.body.id

      // res.jsonp({success : true})
      // alert("Successfully signed up!");

      // console.log(db.collection('event').find({name:req.body.eventname}));
      db.close();
    });
  })

});



  router.post("/removetask", function(req, res, next){
      mongoose.connect(CONNECTION_URL, function(err, db){
        db.collection('tasks').findOne({task: req.body.taskToRemove, person: req.body.personToRemove}, function(err, result){
          if(err) throw err;
          if(result){
            console.log('found')
            console.log(result)
            db.collection('tasks').deleteOne(result);
            db.collection('tasksDone').insertOne(result);
            
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
      })
  })
module.exports = router;







