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
        // Make sure the user is in the database.
        if (!currency) {
            message.reply(`Welcome! I will give you 100 credits to start.`);
            currency = {
                id: message.author.id,
                user: message.author.id,
                credits: 100
            }
            client.setCredits.run(currency);
        }
        // Get bet amount
        if (!betConfirm) {
            const betCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });
            message.channel.send({
                embed: {
                    color: 0xfcce01, // Changes color of left-side line
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    description: "This is one of the many games that I offer! Say '!help' for a complete list all games!",
                    fields: [{
                        name: "WELCOME TO COINFLIP!",
                        value: `This is a simple game that I provide. You will select a bet amount. Then, you will get to guess whether to coin will flip to heads or tails. Finally, I will tell you the outcome. Good Luck! `,
                        inline: true
                    },
                    {
                        name: "RULES",
                        value: `☐ DO NOT LEAVE - You cannot dodge your loss
                                ☐ FOLLOW THE INSTRUCTIONS`,
                        inline: true
                    }, {
                        name: "ENTER A NUMBER FOR YOU BET AMOUNT TO BEGIN:",
                        value: `Just type an integer into the chat`,
                        inline: true
                    },
                    ]
                }
            })
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
            const choiceCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });
            message.channel.send(`Now enter "heads" or "tails"...`);
            console.log(choiceCollector);
            choiceCollector.on('collect', message => {
                if (message.content == "heads" || message.content == 'h') {
                    userChoice = 'h';
                    choiceCollector.stop(["User picked heads."]);
                    message.reply(`you picked heads. Good luck!`);
                    flipCoin();
                }
                else if (message.content == "tails" || message.content == "t") {
                    userChoice = 't';
                    choiceCollector.stop(["User picked tails."]);
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
            win = true;
            db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
            message.reply(`you won **` + bet + ` credits!** You now have ${currency.credits + bet} credits.`);
        }
        // Tails win
        else if (coinDecider < .5 && userChoice == "t") {
            win = true;
            db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
            message.reply(`you won **` + bet + ` credits!** You now have ${currency.credits + bet} credits.`);
        }
        // Loss
        else {
            win = false;
            db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
            message.reply(`you lost **` + bet + ` credits!** You now have ${currency.credits - bet} credits.`);
        }
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