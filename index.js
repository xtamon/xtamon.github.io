// imports
const tmi = require('tmi.js');
const settings = require('./settings.json');
const express = require("express");
const path = require("path");
const routes = require("./routing");
const clips = require("./clipping");

var app = express();

// Web page config
app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

app.listen(app.get("port"),function(){
    console.log("Server has started on port " + app.get("port"));
});

// Twitch bot config
const twitchclient = new tmi.client(
    {
        options: {debug:false},
        connection:{
            secure:true,
            reconnect:true
        },
        identity:{
            username:settings.TwitchUser,
            password:settings.TwitchAuth
        },
        channels: ["Xtamon"]
    }
)

twitchclient.connect();

twitchclient.on("connected",(address,port) => {
    console.log("Twitch bot has started on ip: " + address + ":" + port);
})



twitchclient.on('message',(channel, context, message, self) => {
    message = message.trim().toLowerCase();

    if (message.includes("https://clips.twitch.tv/")){
        clips.addClip(message, clips.clipQueue);
        console.log("New Clip Added to Queue | Current queue is: " + clips.clipQueue);
    }
})


// test clip https://clips.twitch.tv/GentleSpeedyBarracudaOSfrog-_bGYKMkPtH9OW_E8