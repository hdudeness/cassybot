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
    var bet = 1;

    function getUserInput() {
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
                        value: `This is a common casino game that I provide. You will select a bet amount. Then, I will show you the hand that you have been dealt and the dealer's card up. Finally, you can choose to keep hitting or stand. If you win, you will get twice your bet amount! If you lose, I get to keep your bet. Good Luck! `,
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

            // Randomly shuffle the deck object
            deck.shuffle()

            // Get the Dealer's first card
            var dealerFirstCard = deck.deal();
            DealerHand.push(dealerFirstCard);

            // Get the Dealer's second card
            var dealerSecondCard = deck.deal();
            DealerHand.push(dealerSecondCard);

            CardUp = dealerSecondCard; // Show the Dealer's second card
            CardDown = '<:cardback:567400777803497493>';

            // PRINT CARDS 
            var firstCard = deck.deal();
            arr.push(firstCard); // Add to hand array

            var secondCard = deck.deal();
            arr.push(secondCard); // Add to hand array

            // Get total card sum
            for (i = 0; i < arr.length; i++) {
                var card = arr[i];

                var num = card.substring(2, 3);
                num = num.trim();
                console.log(num);
                if (num == 'j' || num == 'q' || num == 'k' || num == 't') {
                    num = 10;
                } else if (num == 'a') {
                    if (total <= 10) {
                        num = 11;
                    } else {
                        num = 1;
                    }
                }
                console.log(total);
                total += parseInt(num, 10);
            }

            var printFormat = arr.join(''); // Set up print format

            // Send embed output
            var sendEmbed =
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
                        value: `${CardUp}${CardDown}`,
                        inline: true
                    }, {
                        name: "NOW ENTER **HIT** OR **STAND**:",
                        value: `**Total: ${total}**`,
                        inline: false
                    },
                    ]
                }
            })
            sendEmbed;

            // Hit or Stand
            const choiceCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });
            console.log(choiceCollector);
            choiceCollector.on('collect', message => {
                if (message.content.toLowerCase() == "hit" || message.content.toLowerCase() == 'h') {
                    userChoice = 'h';
                    choiceCollector.stop(["User picked hit."]);
                    hit(sendEmbed);
                }
                else if (message.content.toLowerCase() == "stand" || message.content.toLowerCase() == "s") {
                    userChoice = 't';
                    choiceCollector.stop(["User picked stand."]);
                    stand(sendEmbed);
                }
                else {
                    choiceCollector.stop(["Incorrect user syntax."])
                    return message.reply(`try saying "hit" or "stand"! Run !blackjack again.`);
                }
            })
        }
    }

    // Storage
    var arr = []; // Player's Hand
    var DealerHand = []; // Dealer
    var total = 0; // Player Card Total
    var CardUp; // Dealer's Card Facing Up
    var CardDown; // Dealer's Card Facing Down

    // ---------------------- HIT -------------------------
    function hit(sendEmbed) {

        // Card that Player hit
        var newCard = deck.deal();
        arr.push(newCard); // Add to Player's Hand

        total = 0; // Reset total

        // Get new total
        for (i = 0; i < arr.length; i++) {
            var card = arr[i];

            var num = card.substring(2, 3);
            num = num.trim();
            console.log(num);
            if (num == 'j' || num == 'q' || num == 'k' || num == 't') {
                num = 10;
            } else if (num == 'a') {
                if (total <= 10) {
                    num = 11;
                } else {
                    num = 1;
                }
            }
            console.log(total);
            total += parseInt(num, 10);
        }

        var printFormat = arr.join(''); // format array print

        // If the player did not bust, print embed
        if (total <= 21) {
            sendEmbed.then((msg) => {
                msg.edit({
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
                            value: `${CardUp}${CardDown}`,
                            inline: true
                        }, {
                            name: "NOW ENTER **HIT** OR **STAND**:",
                            value: `**Total: ${total}**`,
                            inline: false
                        },
                        ]
                    }
                })
            })
        }

        // Otherwise, if the player busted, print bust embed and return
        if (total > 21) {
            busted(sendEmbed);
            return;
        }

        // Hit or Stand
        const choiceCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });
        console.log(choiceCollector);
        choiceCollector.on('collect', message => {
            if (message.content.toLowerCase() == "hit" || message.content.toLowerCase() == 'h') {
                userChoice = 'h';
                choiceCollector.stop(["User picked hit."]);
                hit(sendEmbed);
            }
            else if (message.content.toLowerCase() == "stand" || message.content.toLowerCase() == "s") {
                userChoice = 't';
                choiceCollector.stop(["User picked stand."]);
                stand(sendEmbed);
            }
            else {
                choiceCollector.stop(["Incorrect user syntax."])
                return message.reply(`try saying "hit" or "stand"! Run !blackjack again.`);
            }
        })

    } // ---------------------- HIT -------------------------

    // ---------------------- STAND -------------------------
    function stand(sendEmbed) {

        DealerTotal = 0; // Find dealer's total

        for (i = 0; i < DealerHand.length; i++) {
            var card = DealerHand[i];
            var num = card.substring(2, 3);
            num = num.trim();
            console.log(num);
            if (num == 'j' || num == 'q' || num == 'k' || num == 't') {
                num = 10;
            } else if (num == 'a') {
                if (total <= 10) {
                    num = 11;
                } else {
                    num = 1;
                }
            }
            console.log(total);
            DealerTotal += parseInt(num, 10);
        }

        // Dealer keeps hitting until sum is >= 17
        while (DealerTotal < 17) {
            var anotherCard = deck.deal();
            DealerHand.push(anotherCard);

            var num = anotherCard.substring(2, 3);
            num = num.trim();

            console.log(num);
            if (num == 'j' || num == 'q' || num == 'k' || num == 't') {
                num = 10;
            } else if (num == 'a') {
                if (total <= 10) {
                    num = 11;
                } else {
                    num = 1;
                }
            }
            console.log(total);
            DealerTotal += parseInt(num, 10);
        }

        var printFormat = arr.join(''); // Format print output for array
        var printFormatDealer = DealerHand.join(''); // Format print output for array

        // Send hand embed output
        sendEmbed.then((msg) => {
            msg.edit({
                embed: {
                    color: 0x000000, // Changes color of left-side line
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    fields: [{
                        name: "YOUR HAND\n",
                        value: printFormat,
                        inline: false
                    }, {
                        name: "YOUR TOTAL\n",
                        value: total,
                        inline: false
                    },
                    {
                        name: "DEALER HAND\n",
                        value: printFormatDealer,
                        inline: false
                    }, {
                        name: "DEALER TOTAL\n",
                        value: DealerTotal,
                        inline: false
                    },
                    ]
                }
            })
        })

        // Player total is greater than dealer total
        if (DealerTotal < total || DealerTotal > 21) {
            win = true; // You win
            db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
            message.reply(`you won **` + bet + ` credits!** You now have ${currency.credits + bet} credits.`);
        }
        // Player total is equal to dealer total
        else if (DealerTotal == total) {
            // Push
            message.reply(`you pushed **` + bet + ` credits!** You still have ${currency.credits} credits.`);
        }
        // Player total is less 
        else {
            win = false; // You lost
            db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
            message.reply(`you lost **` + bet + ` credits!** You now have ${currency.credits - bet} credits.`);
        }
    } // ---------------------- STAND -------------------------

    // ---------------------- BUST -------------------------
    function busted() {
        var printFormat = arr.join(''); // Format array print

        // Print out busted hand and total
        sendEmbed.then((msg) => {
            msg.edit({
                embed: {
                    color: 0x000000, // Changes color of left-side line
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    fields: [{
                        name: "YOUR HAND\n",
                        value: printFormat,
                        inline: false
                    }, {
                        name: "YOUR TOTAL (**BUSTED**)\n",
                        value: total,
                        inline: false
                    }]
                }
            })
        })

        // Bust Result
        win = false; // You lost
        db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
        message.reply(`you lost **` + bet + ` credits!** You now have ${currency.credits - bet} credits.`);

    }  // ---------------------- BUST -------------------------

    getUserInput();
}

config: { }