// MUSIC NODE_MODULES
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

// SET UP QUEUES
var queue = [];
var queueNames = [];
var isPlaying = false;

// JOIN CALL -- DISPATCHER
var dispatcher = null;

// SKIP SONG -- TO DO
var skipReq = 0;
var skippers = [];

exports.run = (client, message, args, config, member, ytmessage, ytargs, ytconfig) => {
    const yt_api_key = ytconfig.yt_api_key;

    // DON'T USE
    const bot_controller = config.bot_controller;
    const prefix = config.prefix;
    const discord_token = ytconfig.discord_token;

    // If member is in a voice channel
    if (message.member.voiceChannel) {

        // Check if song is playing
        if (queue.length > 0 || isPlaying) {

            // Get Youtube Video ID
            getID(ytargs, function (id) {

                // Add YouTube Video to Queue using ID
                add_to_queue(id);

                // After Video Info is retrieved 
                fetchVideoInfo(id, function (err, videoInfo) {

                    // Check for error
                    if (err) throw new Error(err);

                    // Message Channel -> Song in queue with video info
                    message.reply(" added to queue: **" + videoInfo.title + "**");
                    queueNames.push(videoInfo.title);
                });
            });
            // Otherwise
        } else {

            // Set song is playing to true
            isPlaying = true;

            // Get Youtube Video ID
            getID(ytargs, function (id) {

                // Add YouTube Video to Queue using ID
                queue.push(id);

                // Join call and play video/song
                playMusic(id, message);

                // After Video Info is retrieved 
                fetchVideoInfo(id, function (err, videoInfo) {

                    // Check for error
                    if (err) throw new Error(err);

                    var timeInMinutes = videoInfo.duration / 60;
                    var time = videoTime(timeInMinutes);

                    // Message Channel -> Song in queue with video info
                    queueNames.push(videoInfo.title);
                    message.channel.send({
                        embed: {
                            color: 0xFF0000, // Changes color of left-side line
                            author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL
                            },
                            description: "**Now Playing:**",
                            fields: [{
                                name: "🎧 **" + videoInfo.title + "** 🎧",
                                value: `Duration: ${time} (${videoInfo.duration} seconds)
                                        Genre: ${videoInfo.genre}
                                        Click here for the [Video URL](${videoInfo.url}).
                                        Current View Count: 🔥${videoInfo.views} views🔥
                                        **!help** for more options`,
                                inline: true
                            }
                            ],
                            timestamp: new Date(),
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: `Requested by ${message.author.tag}`
                            }
                        }
                    })
                    //message.reply("🎧 now playing: **" + videoInfo.title + "**" + " - " /*videoInfo.description );// */+ " - " + videoInfo.views + " views " + videoInfo.genre);
                });
            });
        }
    } else {

        // If user making request is not in a voice channel - tell them to join
        message.reply(" please **join** a **voice channel!**");
    }



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

    function getID(str, callback) {
        if (isYoutube(str)) {
            callback(getYouTubeID(str));
        } else {
            search_video(str, function (id) {
                callback(id);
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

    function videoTime(minutes) {
        var sign = minutes < 0 ? "-" : "";
        var min = Math.floor(Math.abs(minutes));
        var sec = Math.floor((Math.abs(minutes) * 60) % 60);
        return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }
}
