exports.run = (client, message, args) => {

    // General setup
    const Discord = require("discord.js");
    const buff = require('./testbuffer.js');

    // Credit system
    var currency = client.getCredits.get(message.author.id);
    const Database = require("better-sqlite3");
    const db = new Database('./user_data/currency.sqlite');

    // Testing variables
    var betConfirm = false;
    const bet = Math.floor(Math.random() * 10) + 2;
    var choiceConfirm = false;
    var userChoice = 'black';

    // This is the "bot"
    function betSend() {
        message.channel.send(bet);
        setTimeout(() => {
            choiceSend();
        }, 2000)
    }

    // "Bot"
    function choiceSend() {
        message.reply(`your bet is **` + bet + ` credits!**`);
        message.channel.send(
            {
                embed: {
                    color: 0xFFA500, // Changes color of left-side line
                    description: `Now enter **red** or **black** or **green**:`
                }
            }
        );
        setTimeout(() => {
            choiceReply();
        }, 2000)
        setTimeout(() => {
            if (userChoice == 'red') {
                message.reply('you picked red. Good luck!');
                sendOutcome();
            }
            else {
                message.reply('you picked black. Good luck!');
                sendOutcome();
            }
        }, 4000);
    }

    // "User"
    function choiceReply() {
        var choice = Math.floor(Math.random() * 2);
        if (choice == 0)
            message.channel.send('black');
        else {
            message.channel.send('red');
            userChoice = 'red';
        }
    }

    function sendOutcome() {

        // Send heads/tails picture
        setTimeout(() => {
            var wheelSlot = getRandomInt(36);
            var win = false;

            message.channel.send({
                files: [
                    "./images/roulette.gif" // Image to send
                ]
            });
            setTimeout(() => {
                if (wheelSlot == 0) {
                    message.channel.send(
                        {
                            embed: {
                                color: 0xFFA500, // Changes color of left-side line
                                description: "💚**GREEN**💚"

                            }
                        }
                    );
                }
                else if (wheelSlot >= 1 && wheelSlot <= 16) {
                    message.channel.send(
                        {
                            embed: {
                                color: 0xFFA500, // Changes color of left-side line
                                description: "🔴**RED**🔴"

                            }
                        }
                    );
                } else {
                    message.channel.send(
                        {
                            embed: {
                                color: 0xFFA500, // Changes color of left-side line
                                description: "⚫**BLACK**⚫"

                            }
                        }
                    );
                }
            }, 3000);

            // Send outcome
            setTimeout(() => {
                // green win
                if (wheelSlot == 0 && userChoice == "green") {
                    win = true;
                    // Update database
                    db.exec("UPDATE currency SET credits = credits + " + bet * 16 + " WHERE id = " + message.author.id + ";");
                    message.reply(`you won ** ${bet * 16} credits!** You now have ${(currency.credits + bet * 36)} credits.`);
                }
                // red win
                else if (wheelSlot >= 1 && wheelSlot <= 16 && userChoice == "red") {
                    win = true;
                    // Update database
                    db.exec("UPDATE currency SET credits = credits + " + bet + " WHERE id = " + message.author.id + ";");
                    message.reply(`you won ** ${bet} credits!** You now have ${currency.credits + bet} credits.`);
                }
                // black win
                else if (wheelSlot >= 17 && wheelSlot <= 36 && userChoice == "black") {
                    win = true;
                    // Update database
                    db.exec("UPDATE currency SET credits = credits + " + bet + " WHERE id = " + message.author.id + ";");
                    message.reply(`you won ** ${bet} credits!** You now have ${currency.credits + bet} credits.`);
                }
                //loss
                else {
                    win = false;
                    // Update database
                    db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
                    message.reply(`you lost ** ${bet} credits!** You now have ${currency.credits - bet} credits.`);
                }
            }, 4000);
        }, 4000);


    }
    // Begin testing
    message.channel.send({
        embed: {
            color: 0xFFA500, // Changes color of left-side line
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            description: "This is one of the many games that I offer! Say '!help' for a complete list all games!",
            fields: [{
                name: "💣WELCOME TO ROULETTE!💣",
                value: `This is a simple game that I provide. You will select a bet amount and then pick one of three colors. This is a standard 37 slot roulette wheel with 18 Red, 18 Black, and 1 Green spot`,
                inline: true
            },
            {
                name: "WININGS",
                value: `The amount you win when your guess is correct depends on what color you pick:
                        **RED** and **Black** win your bet amount!
                        **GREEN** rewards you big with 36X your bet amount!`,
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
    setTimeout(() => {
        betSend();
    }, 2000)

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max + 1));
    }

    // If CassyBot -> Test
    if (message.author == client.user) {
        buff.coin = true;
    }
}
