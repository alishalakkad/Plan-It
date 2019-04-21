const userSchema = require('./userSchema.js')
const User = mongoose.model('user', userSchema, 'user')
// document.getElementById("signupbtn").addEventListener("click", signup);
// async function findUser(username) {
//     return await User.findOne({ username })
// }

function createUser(username, password) {
    return new User({
      username,
      password,
      created: Date.now()
    })
}

console.log("enterted jssss")

function login() {
    location.href = "joinevent.html"
}


function signup() {
    alert("Successfully signed up!");
    console.log("YAYAYAYAYYAYAYYA")
    var username = document.getElementById("username").value;
    var password = document.getElementById("pass").value;
    var confirmPass = document.getElementById("confirmpass").value;

    console.log(username)
    
    // let user = await connector.then(async () => {
    //     return findUser(username)
    // })
        
    // if (!user) {
         var database = connector.test;
         var collection = database.user;
         collection.insertOne(createUser(username, password))
    // }
}

function createEvent(){
    location.href = "planner.html"
}

function joinEvent(){
    location.href = "planner.html"
}