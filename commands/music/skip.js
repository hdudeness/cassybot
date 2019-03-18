const play = require('./play.js');

// SKIP SONG -- TO DO
var skipReq = 0;
var skippers = [];

exports.run = (client, message, args, config, member, ytmessage, ytargs, ytconfig) => {

    if (ytmessage.startsWith("!skip")) {
        if (skippers.indexOf(message.author.id) === -1) {

            skippers.push(message.author.id);
            skipReq++;

            if (skipReq >= Math.ceil((message.member.voiceChannel.members.size - 1) / 2)) {
                skipSong(message);
                message.reply("SKIPPING");

            } else {
                message.reply(" NEED **" + Math.ceil((voiceChannel.members.size - 1) / 2) - skipReq) = "**  more skip votes. ";
            }
        } else {
            message.reply("YOU CANNOT VOTE TWICE");
        }
    }



    function skipSong(message) {
        play.dispatcher.end();
    }
}


