const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./json/config.json');

// MUSIC
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

// SQL
const SQLite = require("better-sqlite3");
const sql = new SQLite('./user_data/currency.sqlite');

client.on('ready', () => {
    // Prepare SQL table for user currency
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'currency';").get();
    if (!table['count(*)']) {
        // Check to see if the table exists, if it doesn't then set it up
        sql.prepare("CREATE TABLE currency (id TEXT PRIMARY KEY, user TEXT, credits INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_currency_id ON currency (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    // Getters and setters for credits data
    client.getCredits = sql.prepare("SELECT * FROM currency WHERE user = ?");
    client.setCredits = sql.prepare("INSERT OR REPLACE INTO currency (id, user, credits) VALUES (@id, @user, @credits);");

    // Logging in
    console.log("Logged in, ready to go!");
    console.log(`Bot ID: ${client.user.tag}`);
    client.user.setActivity("with Team 3 in JavaScript", { type: `STREAMING`, url: `https://www.twitch.tv/stairs_nooo` }); // Changes bot activity
});

client.on('message', message => {


    const member = message.member;
    const ytmessage = message.content.toLowerCase();
    const ytargs = message.content.split(' ').slice(1).join(" ");

    // MUSIC
    if (ytmessage.startsWith(prefix + "leave")){
        message.member.voiceChannel.leave();
    }
    else if (ytmessage.startsWith(prefix + "play")) {
        // If member is in a voice channel
        if (message.member.voiceChannel) {
            // Check if song is playing
            if (queue.length > 0 || isPlaying) {
                getID(ytargs, function (id) {
                    add_to_queue(id);
                    fetchVideoInfo(id, function (err, videoInfo) {
                        if (err) throw new Error(err);
                        message.reply(" added to queue: **" + videoInfo.title + "**");
                        queueNames.push(videoInfo.title);
                    });
                });
            } else {
                isPlaying = true;
                getID(ytargs, function (id) {
                    queue.push(id);
                    playMusic(id, message);
                    fetchVideoInfo(id, function (err, videoInfo) {
                        if (err) throw new Error(err);
                        queueNames.push(videoInfo.title);
                        message.reply(" now playing: **" + videoInfo.title + "**");
                    });
                });
            }
        } else {
            message.reply(" please **join** a **voice channel!**");
        }
    } else {


        // Log Message in Console 
        console.log(message.content);

        // If Someones Flips a Table
        if (message.content == '(╯°□°）╯︵ ┻━┻') {
            // Unflip Table
            message.channel.send('┬─┬ ノ( ゜-゜ノ)');
            message.channel.send('Please **DON\'T** flip tables. This is a professionally organized server. If you want to flip tables you may leave.');
        }

        console.log(' ')
        console.log('--------------------')
        console.log(message.author.username + " || User ID: " + client.user.id + " || Channel ID: " + message.channel.id)
        if (!message.content.startsWith(config.prefix) || (message.author.bot && (message.author != client.user)))
            return;

        // Remove '!' from command
        const args = message.content.slice(config.prefix.length).trim().split(/ + /g);

        // Change command to lower case (i.e. !pInG = !ping)
        const command = args.shift().toLowerCase();

        // Run command file
        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args);
        } catch (err) {

            if (message.author != client.user) {
                message.reply('Sorry! That is not a command that I know. Say **!help** to receive a list of commands I know!');
            }

            // Error - Print to Console
            console.error(err);
        }
    }
});

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


client.login(config.token);