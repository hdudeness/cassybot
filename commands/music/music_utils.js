const config = require('../../json/config.json');

const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

var ytconfig = JSON.parse(fs.readFileSync('./json/settings.json', 'utf-8'));


const yt_api_key = ytconfig.yt_api_key;
const bot_controller = config.bot_controller;
const prefix = config.prefix;
const discord_token = ytconfig.discord_token;

var queue = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var skipReq = 0;
var skippers = [];

var guilds = {};

function playMusic(id, message) {
    var voiceChannel = message.member.voiceChannel;
    voiceChannel.join().then(function (connection) {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: 'audioonly'
        });
        skipReq = 0;
        skippers = [];

        dispatcher = connection.playStream(stream);
        dispatcher.on('end', function () {
            skipReq = 0;
            skippers = [];
            queue.shift();
            queueNames.shift();
            if (queue.length === 0) {
                queue = [];
                queueNames = [];
                isPlaying = false;
            } else {
                setTimeout(function () {
                    playMusic(queue[0], message);
                }, 500);
            }
        });
    });
}

function getID(str, cb) {
    if (isYoutube(str)) {
        cb(getYouTubeID(str));
    } else {
        search_video(str, function (id) {
            cb(id);
        });
    }
}

function add_to_queue(strID) {
    // Youtube Video
    if (isYoutube(strID)) {
        queue.push(getYouTubeID(strID)); // Push YoutubeID
    } else {
        queue.push(strID);
    }
}

function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function (error, response, body) {
        var json = JSON.parse(body);
        callback(json.items[0].id.videoId);

    });
}

function skip_song(message) {
    dispfatcher.end();
}

function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}

