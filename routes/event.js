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
router.get('/event', function(req, res, next) {
  res.render("joinevent")
});



module.exports = router;
