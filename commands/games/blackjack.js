const deck = require("./deck.js");
exports.run = (client, message, args) => {

    // General setup
    const Discord = require("discord.js");
    

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
                    color: 0x000000, // Changes color of left-side line
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    description: "This is one of the many games that I offer! Say '!help' for a complete list all games!",
                    fields: [{
                        name: "🃏WELCOME TO BLACKJACK!🃏",
                        value: `This is ... You will select a bet amount. Then, ... Finally, ... If you win ..! If you lose ... Good Luck! `,
                        inline: true
                    },
                    {
                        name: "RULES",
                        value: `• DO NOT LEAVE - You cannot dodge your loss
                                • FOLLOW THE INSTRUCTIONS - I will guide you every step of the way`,
                        inline: true
                    }, {
                        name: "ENTER A NUMBER FOR YOU BET AMOUNT TO BEGIN:",
                        value: `**Just type an integer into the chat**`,
                        inline: true
                    },
                    ]
                }
            })
            console.log(betCollector);
            betCollector.on('collect', message => {
                if (message.content == 0 || message.content < 0) {
                    betCollector.stop(["Incorrect user syntax."])
                    return message.reply(`your bet must be greater than zero! Run **!coinflip** again.`);
                }
                else if (isNaN(message.content)) {
                    betCollector.stop(["Incorrect user syntax."])
                    return message.reply(`that is not a valid number! Run **!coinflip** again.`);
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
            message.channel.send(
                {
                    embed: {
                        color: 0xfcce01, // Changes color of left-side line
                        description: `Now enter **hit** or **stand**:`
                    }
                }
            );
            console.log(choiceCollector);
            choiceCollector.on('collect', message => {
                if (message.content.toLowerCase() == "hit" || message.content.toLowerCase() == 'h') {
                    userChoice = 'h';
                    choiceCollector.stop(["User picked hit."]);
                    message.reply(`you picked hit. Good luck!`);
                    blackjackGame();
                }
                else if (message.content.toLowerCase() == "stand" || message.content.toLowerCase() == "s") {
                    userChoice = 't';
                    choiceCollector.stop(["User picked stand."]);
                    message.reply(`you picked stand. Good luck!`);
                    blackjackGame();
                }
                else {
                    choiceCollector.stop(["Incorrect user syntax."])
                    return message.reply(`try saying "hit" or "stand"! Run !blackjack again.`);
                }
            })
        }
    }

    // Get outcome, take/give credits based on user choice.
    function blackjackGame() {
        var coinDecider = getRandomInt(1);
        var win = false;

        // message.channel.send({
        //     files: [
        //         "./images/coinflip.gif" // Image to send
        //     ]
        // });

        // setTimeout(() => {

        //     if (coinDecider > .5) {
        //         message.channel.send(
        //             {
        //                 embed: {
        //                     color: 0xfcce01, // Changes color of left-side line
        //                     description: "**HEADS**",
        //                     files: [
        //                         "./images/heads.jpg" // Image to send
        //                     ]
        //                 }
        //             }
        //         );
        //     } else {
        //         message.channel.send(
        //             {
        //                 embed: {
        //                     color: 0xfcce01, // Changes color of left-side line
        //                     description: "**TAILS**",
        //                     files: [
        //                         "./images/tails.jpg" // Image to send
        //                     ]
        //                 }
        //             }
        //         );
        //     }

        setTimeout(() => {
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
        }, 1000);
        // } , 3000);



    }

    getUserInput();
}

// Returns Random Number 0 - Max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}
config: { }