const express = require("express");
const clips = require("./clipping");


var router = express.Router();



router.get("/", function(req,res){
    res.render("home", {clips: clips.clipQueue});
});

module.exports = router;