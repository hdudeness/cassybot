exports.run = (client, message, args) => {
    // Testing variables
    const bet = Math.floor(Math.random() * 10) + 2;
    var userChoice = 'h';

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
        message.reply('now enter "heads", or "tails"!');
        setTimeout(() => {
            choiceReply();
        }, 2000)
        setTimeout(() => {
            if (userChoice == 'h') {
                message.reply('you picked heads. Good luck!');
                sendOutcome();
            }
            else {
                message.reply('you picked tails. Good luck!');
                sendOutcome();
            }
        }, 4000);
    }

    // "User"
    function choiceReply() {
        var choice = Math.floor(Math.random() * 2);
        if (choice == 0)
            message.channel.send('heads');
        else {
            message.channel.send('tails');
            userChoice = 't';
        }
    }

    function sendOutcome() {
        var coinDecider = getRandomInt(1);
        var win = false;

        // Send gif
        setTimeout(() => {
            message.channel.send({
                files: [
                    "./images/coinflip.gif" // Image to send
                ]
            });
        }, 2000);

        // Send heads/tails picture
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
        }, 3000);

        // Send outcome
        setTimeout(() => {
            if (coinDecider > .5 && userChoice == 'h')
                win = true;
            else if (coinDecider < .5 && userChoice == 't')
                win = true;
            else
                win = false;
            message.reply(`you ` + ((win) ? `won ` : `lost `) + `**` + bet + ` credits!** You now have ` + ((win) ? `${currency.credits + bet}` : `${currency.credits - bet}`) + ` credits.`);
        }, 4000);
    }

    // Begin testing
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
    setTimeout(() => {
        betSend();
    }, 2000)

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max + 1));
    }

}
config: { }