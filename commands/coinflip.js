/* Harrison R. Taylor - hrtaylor@mtu.edu
Place your bet, pick heads or tails and go! Coinflip utilitizes Discord's collectors
to take in user input. When the bot asks for the bet amount and the user types in an integer,
the collectors save this value for later use. What I did was create if-else statements
for every possible edge case in coinflip. This isn't as bad as it sounds mainly because 
there's only 2 possible outcomes for coinflip, so we aren't dealing with many edge cases here.

After checking if the user has won or not, the database is updated by adding the amount that the user won to
their currency database. Instead of using several if statements to do different database queries depending on if the user
won or not, I stuck with a single ternary statement to simplify (or complicate?).
*/

exports.run = (client, message, args) => {

    // General setup
    const Discord = require("discord.js");
    const buff = require('./testbuffer.js');

    // Credit system
    var currency = client.getCredits.get(message.author.id);
    const Database = require("better-sqlite3");
    const db = new Database('./user_data/currency.sqlite');

    // getUserInput variables
    var betConfirm = false;
    var userChoice = 'h';
    var bet = 1;

    function getUserInput() {
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
                        name: "💰WELCOME TO COINFLIP!💰",
                        value: `This is a simple game that I provide. You will select a bet amount. Then, you will get to guess whether a coin will flip and land on heads or tails. Finally, I will tell you the outcome. If you win you get double your money! If you loss I keep the credits you chose to bet. Good Luck! `,
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
                    betCollector.stop([console.log("Incorrect user syntax.")])
                    return message.reply(`your bet must be greater than zero! Run **!coinflip** again.`);
                }
                else if (isNaN(message.content)) {
                    betCollector.stop([console.log("Incorrect user syntax.")])
                    return message.reply(`that is not a valid number! Run **!coinflip** again.`);
                }
                else {
                    bet = parseInt(message.content);
                    betCollector.stop([console.log("Bet recieved.")])
                    message.reply(`your bet is **` + bet + ` credits!**`);

                    if (currency.credits < bet) {
                        betCollector.stop(console.log("Not enough user credits."))
                        message.reply(`you don't have enough credits! You currently have ${currency.credits} credits. Run !coinflip again!`);
                        return;
                    }

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
                        description: `Now enter **heads** or **tails**:`
                    }
                }
            );
            console.log(choiceCollector);
            choiceCollector.on('collect', message => {
                if (message.content.toLowerCase() == "heads" || message.content.toLowerCase() == 'h') {
                    userChoice = 'heads';
                    choiceCollector.stop([console.log("User picked heads.")]);
                    message.reply(`you picked heads. Good luck!`);
                    flipCoin();
                }
                else if (message.content.toLowerCase() == "tails" || message.content.toLowerCase() == "t") {
                    userChoice = 'tails';
                    choiceCollector.stop([console.log("User picked tails.")]);
                    message.reply(`you picked tails. Good luck!`);
                    flipCoin();
                }
                else {
                    choiceSyntaxTest = true;
                    choiceCollector.stop([console.log("Incorrect user syntax.")])
                    return message.reply(`try saying "heads" or "tails"! Run !coinflip again.`);
                }
            })
        }
    }

    // Get outcome, take/give credits based on user choice.
    function flipCoin() {
        var coinDecider = getRandomInt(1);
        var win = false;

        message.channel.send({
            files: [
                "./images/coinflip.gif" // Image to send
            ]
        });
        setTimeout(() => {
            if (coinDecider > .5) {
                message.channel.send(
                    {
                        embed: {
                            color: 0xfcce01, // Changes color of left-side line
                            description: "**HEADS**",
                            files: [
                                "./images/heads.jpg" // Image to send
                            ]
                        }
                    }
                );
            } else {
                message.channel.send(
                    {
                        embed: {
                            color: 0xfcce01, // Changes color of left-side line
                            description: "**TAILS**",
                            files: [
                                "./images/tails.jpg" // Image to send
                            ]
                        }
                    }
                );
            }
            setTimeout(() => {
                // Heads win
                if (coinDecider > .5 && userChoice == "heads")
                    win = true;
                // Tails win
                else if (coinDecider < .5 && userChoice == "tails")
                    win = true;
                // Loss
                else
                    win = false;
                // Update database
                db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
                message.reply(`you ` + ((win) ? `won ` : `lost `) + `**` + bet + ` credits!** You now have ` + ((win) ? `${currency.credits + bet}` : `${currency.credits - bet}`) + ` credits.`);
            }, 1000);
        }, 3000);
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