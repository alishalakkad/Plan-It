const Express = require("express");

const mongoose = require("mongoose")
var path = require("path");
// const MongoClient = require("mongodb").MongoClient;
// const userSchema = require('./userSchema.js')
// const User = mongoose.model('user', userSchema, 'user')
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://cs252:cs252@planitdb-dvbrl.mongodb.net/test?retryWrites=truee";
const DATABASE_NAME = "test";

var app = Express();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var engines = require('consolidate');

app.set('views', __dirname);
app.engine('html', engines.mustache);
app.set('view engine', 'html');


// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));


var database, collection, connector;

// async function createUser(username, password) {
//     return new User({
//       username,
//       password,
//       created: Date.now()
//     }).save()
// }

// async function findUser(username) {
//     return await User.findOne({ username })
// }

app.use('/', indexRouter);
app.use('/signup', indexRouter);

// app.use('/', (req, res) => {
//     res.sendFile(__dirname+"/mainpage.html")
// });

app.listen(8470, () => {
    ;(async () => {
        connector = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
            if(error) {
                console.log('here')
            }
        });
        
        // database = client.db(DATABASE_NAME);
        // collection = database.collection("people");
        // let user = await connector.then(async () => {
        //     return findUser(username)
        // })
            
        // if (!user) {
        //     user = await createUser(username, password)
        // }

        console.log("Connected to `" + DATABASE_NAME + "`!");
    

       // process.exit(0)
        
    }) ()
});

