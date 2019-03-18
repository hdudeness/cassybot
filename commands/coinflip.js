exports.run = (client, message, args) => {

    // General setup
    const Discord = require("discord.js");
    const buff = require('./testbuffer.js');

    // Credit system
    let currency = client.getCredits.get(message.author.id);
    const Database = require("better-sqlite3");
    const db = new Database('./user_data/currency.sqlite');

    // getUserInput variables
    var betConfirm = false;
    var userChoice = 'h';
    var bet = 1;

    function getUserInput() {
        // Get bet amount
        if (!betConfirm) {
            const betCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, {time: 10000});
            message.channel.send(`Welcome to coinflip! Enter your bet amount...`);
            console.log(betCollector);
            betCollector.on('collect', message => {
                if (message.content == 0 || message.content < 0) {
                    betCollector.stop(["Incorrect user syntax."])
                    return message.reply(`your bet must be greater than zero! Run !coinflip again.`);
                }
                else if (isNaN(message.content)) {
                    betCollector.stop(["Incorrect user syntax."])
                    return message.reply(`that is not a valid number! Run !coinflip again.`);
                }
                else {
                    bet = parseInt(message.content);
                    betCollector.stop(["Bet recieved."])
                    message.reply(`your bet is **` + bet + ` credits!**`);
                    betConfirm = true;
                    getUserInput();
                }
            })
        }
        else {
        // Get heads or tails
            const choiceCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, {time: 10000});
            message.channel.send(`Now enter heads or tails...`);
            console.log(choiceCollector);
            choiceCollector.on('collect', message => {
                if (message.content == "heads" || message.content == 'h') {
                    userChoice = 'h';
                    choiceCollector.stop(["User picked heads."]);
                    choiceConfirm = true;
                    message.reply(`you picked heads. Good luck!`);
                    flipCoin();
                }
                else if (message.content == "tails" || message.content == "t") {
                    userChoice = 't';
                    choiceCollector.stop(["User picked tails."]);
                    choiceConfirm = true;
                    message.reply(`you picked tails. Good luck!`);
                    flipCoin();
                }
                else {
                    choiceCollector.stop(["Incorrect user syntax."])
                    return message.reply(`try saying "heads" or "tails"! Run !coinflip again.`);
                }
            })
        }
    }

    // Get outcome, take/give credits based on user choice.
    function flipCoin() {
        var coinDecider = getRandomInt(1);
        var win = false;

        // Heads win
        if (coinDecider > .5 && userChoice == "h") {
            message.reply(`you won! You bet ` + bet + ` credits and won **` + bet + ` credits!**`);
            win = true;
        }
        // Tails win
        else if (coinDecider < .5 && userChoice == "t") {
            message.reply(`you won! You bet ` + bet + ` credits and won **` + bet + ` credits!**`);
            win = true;
        }
        // Loss
        else {
            message.reply(`you lost! Say goodbye to **` + bet + ` credits!**`);
            win = false;
        }
        // Update user currency
        db.exec("UPDATE currency SET credits = credits " + ((win)?"+":"-") +" "+ bet +" WHERE id = " + message.author.id +";");
    }

    getUserInput();
    
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