exports.run = (client, message, args) => {
    // General setup
    const Discord = require("discord.js");
    const buff = require('./testbuffer.js');

    // Collectors
    const sendCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });

    // Credit system
    var currency = client.getCredits.get(message.author.id);
    const Database = require("better-sqlite3");
    const db = new Database('./user_data/currency.sqlite');

    // Testing variables
    var betConfirm = false;
    var userChoice = 'h';
    var bet = 1;

    // This is the "bot"
    function betSend() {
        if (!betConfirm) {
            const sendCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });
            console.log(sendCollector);
            sendCollector.on('collect', message => {
                bet = parseInt(message.content);
                if (bet > 1) {
                    betSend();
                }
            })
        }
        else {
            message.reply('now enter "heads", or "tails"!');
        }
    }

    function choiceSend() {

    }

    // This is the "user"
    function betReply() {
        message.channel.send(Math.floor(Math.random() * 10) + 2);
        betConfirm = true;
    }

    function choiceReply() {
        
    }

    // Begin testing
    message.channel.send('Welcome to coinflip! Enter your bet amount...');
    betSend();
    // Wait 2 seconds before replying.
    setTimeout(() => {
        betReply();
    }, 2000);
}
config: { }