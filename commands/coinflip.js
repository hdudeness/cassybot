const Discord = require("discord.js");
const collector = new Discord.Client();

exports.run = (client, message, args) => {

    /*
    message.channel.send('', {
        files: [
            "./Images/coinflip.gif" // GIF to send
        ]
    });
    */

    // TO DO
    //message.channel.send('Heads or tails?');

    // Get Random (0 or 1)
    var coin = getRandomInt(1);

    // TO DO -- Ask Heads or tails

    // If 0 its Heads
    if (coin == 0) {
        // Send Text Above 
        message.channel.send('**HEADS**', {
            files: [
                "./Images/heads.jpg" // Image to send
            ]
        });

        // Otherwise Tails
    } else {
        // Send Text Above 
        message.channel.send('**TAILS**', {
            files: [
                "./Images/tails.jpg" // Image to send
            ]
        });
    }

}

// Returns Random Number 0 - Max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}
config: { }