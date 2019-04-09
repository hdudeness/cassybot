const Deck = require("./deck.js");

exports.run = (client, message, args, userid) => {

    // General setup
    const Discord = require("discord.js");
    const deck = Deck.newDeck();

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
            message.reply(`welcome! I will give you 100 credits to start.`);
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
                    return message.reply(`your bet must be greater than zero! Run **!blackjack** again.`);
                }
                else if (isNaN(message.content)) {
                    betCollector.stop(["Incorrect user syntax."])
                    return message.reply(`that is not a valid number! Run **!blackjack** again.`);
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

            deck.shuffle()

            var dealerFirstCard = deck.deal();
            DealerHand.push(dealerFirstCard);
            var dealerSecondCard = deck.deal();
            DealerHand.push(dealerSecondCard);


            CardUp = dealerSecondCard;

            // PRINT CARDS 
            var firstCard = deck.deal();
            arr.push(firstCard);

            // message.channel.send(
            //     ` ${firstCard}`
            // )


            var secondCard = deck.deal();
            arr.push(secondCard);

            for (i = 0; i < arr.length; i++) {
                var card = arr[i];

                var num = card.substring(0, 2);
                num = num.trim();
                console.log(num);
                if (num == 'Ja' || num == 'Qu' || num == 'Ki') {
                    num = 10;
                } else if (num == 'Ac') {
                    if (total <= 10) {
                        num = 11;
                    } else {
                        num = 1;
                    }
                }
                console.log(total);
                total += parseInt(num, 10);


            }



            var printFormat = arr.join(', ');

            message.channel.send({
                embed: {
                    color: 0x000000, // Changes color of left-side line
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    fields: [{
                        name: "YOUR HAND",
                        value: printFormat,
                        inline: true
                    },
                    {
                        name: "DEALER CARD UP",
                        value: `${CardUp}`,
                        inline: true
                    }, {
                        name: "NOW ENTER **HIT** OR **STAND**:",
                        value: `**Total: ${total}**`,
                        inline: true
                    },
                    ]
                }
            })

            const choiceCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });
            console.log(choiceCollector);
            choiceCollector.on('collect', message => {
                if (message.content.toLowerCase() == "hit" || message.content.toLowerCase() == 'h') {
                    userChoice = 'h';
                    choiceCollector.stop(["User picked hit."]);
                    hit();
                }
                else if (message.content.toLowerCase() == "stand" || message.content.toLowerCase() == "s") {
                    userChoice = 't';
                    choiceCollector.stop(["User picked stand."]);
                    stand();
                }
                else {
                    choiceCollector.stop(["Incorrect user syntax."])
                    return message.reply(`try saying "hit" or "stand"! Run !blackjack again.`);
                }
            })
        }
    }

    var arr = [];
    var DealerHand = [];
    var total = 0;
    var CardUp;


    // ---------------------- HIT -------------------------
    function hit() {

        var newCard = deck.deal();
        arr.push(newCard);

        total = 0;

        for (i = 0; i < arr.length; i++) {
            var card = arr[i];

            var num = card.substring(0, 2);
            num = num.trim();
            console.log(num);
            if (num == 'Ja' || num == 'Qu' || num == 'Ki') {
                num = 10;
            } else if (num == 'Ac') {
                if (total <= 10) {
                    num = 11;
                } else {
                    num = 1;
                }
            }
            console.log(total);
            total += parseInt(num, 10);
        }

        var printFormat = arr.join(', ');
        
        if (total <= 21) {

            message.channel.send({
                embed: {
                    color: 0x000000, // Changes color of left-side line
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    fields: [{
                        name: "YOUR HAND",
                        value: printFormat,
                        inline: true
                    },
                    {
                        name: "DEALER CARD UP",
                        value: `${CardUp}`,
                        inline: true
                    }, {
                        name: "NOW ENTER **HIT** OR **STAND**:",
                        value: `**Total: ${total}**`,
                        inline: true
                    },
                    ]
                }
            })
        }

        if (total > 21) {
            busted();
            //message.channel.send(`Busted`);
            return;
        }

        const choiceCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });

        console.log(choiceCollector);
        choiceCollector.on('collect', message => {
            if (message.content.toLowerCase() == "hit" || message.content.toLowerCase() == 'h') {
                userChoice = 'h';
                choiceCollector.stop(["User picked hit."]);
                hit();
            }
            else if (message.content.toLowerCase() == "stand" || message.content.toLowerCase() == "s") {
                userChoice = 't';
                choiceCollector.stop(["User picked stand."]);
                stand();
            }
            else {
                choiceCollector.stop(["Incorrect user syntax."])
                return message.reply(`try saying "hit" or "stand"! Run !blackjack again.`);
            }
        })

    }

    // ---------------------- HIT -------------------------
    function stand() {

        DealerTotal = 0;
        for (i = 0; i < DealerHand.length; i++) {
            var card = DealerHand[i];

            var num = card.substring(0, 2);
            num = num.trim();
            console.log(num);
            if (num == 'Ja' || num == 'Qu' || num == 'Ki') {
                num = 10;
            } else if (num == 'Ac') {
                if (total <= 10) {
                    num = 11;
                } else {
                    num = 1;
                }
            }
            console.log(total);
            DealerTotal += parseInt(num, 10);
        }

        while (DealerTotal < 17) {
            var anotherCard = deck.deal();
            DealerHand.push(anotherCard);

            var num = anotherCard.substring(0, 2);
            num = num.trim();

            console.log(num);
            if (num == 'Ja' || num == 'Qu' || num == 'Ki') {
                num = 10;
            } else if (num == 'Ac') {
                if (total <= 10) {
                    num = 11;
                } else {
                    num = 1;
                }
            }
            console.log(total);
            DealerTotal += parseInt(num, 10);

        }

        var printFormat = arr.join(', ');
        var printFormatDealer = DealerHand.join(', ');
        message.channel.send({
            embed: {
                color: 0x000000, // Changes color of left-side line
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                fields: [{
                    name: "YOUR HAND\n",
                    value: printFormat,
                    inline: true
                }, {
                    name: "YOUR TOTAL\n",
                    value: total,
                    inline: true
                },
                {
                    name: "DEALER HAND\n",
                    value: printFormatDealer,
                    inline: true
                }, {
                    name: "DEALER TOTAL\n",
                    value: DealerTotal,
                    inline: true
                },
                ]
            }
        })
        // message.channel.send(`Total: ${DealerTotal}`);


        // if (coinDecider > .5 && userChoice == "h") {
        //     win = true;
        //     db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
        //     message.reply(`you won **` + bet + ` credits!** You now have ${currency.credits + bet} credits.`);
        // }
        // // Tails win
        // else if (coinDecider < .5 && userChoice == "t") {
        //     win = true;
        //     db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
        //     message.reply(`you won **` + bet + ` credits!** You now have ${currency.credits + bet} credits.`);
        // }
        // // Loss
        // else {
        //     win = false;
        //     db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
        //     message.reply(`you lost **` + bet + ` credits!** You now have ${currency.credits - bet} credits.`);
        // }
    }

    function busted() {

        DealerTotal = 0;
        for (i = 0; i < DealerHand.length; i++) {
            var card = DealerHand[i];

            var num = card.substring(0, 2);
            num = num.trim();
            console.log(num);
            if (num == 'Ja' || num == 'Qu' || num == 'Ki') {
                num = 10;
            } else if (num == 'Ac') {
                if (total <= 10) {
                    num = 11;
                } else {
                    num = 1;
                }
            }
            console.log(total);
            DealerTotal += parseInt(num, 10);
        }

        while (DealerTotal < 17) {
            var anotherCard = deck.deal();
            DealerHand.push(anotherCard);

            var num = anotherCard.substring(0, 2);
            num = num.trim();

            console.log(num);
            if (num == 'Ja' || num == 'Qu' || num == 'Ki') {
                num = 10;
            } else if (num == 'Ac') {
                if (total <= 10) {
                    num = 11;
                } else {
                    num = 1;
                }
            }
            console.log(total);
            DealerTotal += parseInt(num, 10);

        }

        var printFormat = arr.join(', ');
        var printFormatDealer = DealerHand.join(', ');
        message.channel.send({
            embed: {
                color: 0x000000, // Changes color of left-side line
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                fields: [{
                    name: "YOUR HAND\n",
                    value: printFormat,
                    inline: true
                }, {
                    name: "YOUR TOTAL (**BUSTED**)\n",
                    value: total,
                    inline: true
                }]
            }
        })
        // message.channel.send(`Total: ${DealerTotal}`);


        // if (coinDecider > .5 && userChoice == "h") {
        //     win = true;
        //     db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
        //     message.reply(`you won **` + bet + ` credits!** You now have ${currency.credits + bet} credits.`);
        // }
        // // Tails win
        // else if (coinDecider < .5 && userChoice == "t") {
        //     win = true;
        //     db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
        //     message.reply(`you won **` + bet + ` credits!** You now have ${currency.credits + bet} credits.`);
        // }
        // // Loss
        // else {
        //     win = false;
        //     db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
        //     message.reply(`you lost **` + bet + ` credits!** You now have ${currency.credits - bet} credits.`);
        // }
    }

    getUserInput();
}

config: { }