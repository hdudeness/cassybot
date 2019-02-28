const Discord = require("discord.js");
const collector = new Discord.Client();
const buff = require('./testbuffer.js');

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
    //const msg = await message.channel.awaitMessages(msg => msg.content.includes("help"), {time: 5000}); 

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
    
    // If CassyBot -> Test
    if (message.author == client.user) {
        buff.coin = true;
    }
}

// Returns Random Number 0 - Max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}
config: { }