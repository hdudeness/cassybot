const Deck = require("./games/deck.js");

exports.run = (client, message, args) => {

    // General setup
    const Discord = require("discord.js");
    const buff = require('./testbuffer.js');
    const deck = Deck.newDeck();

    // Credit system
    var currency = client.getCredits.get(message.author.id);
    const Database = require("better-sqlite3");
    const db = new Database('./user_data/currency.sqlite');

    // Testing variables
    var betConfirm = false;
    const bet = Math.floor(Math.random() * 10) + 2;
    var choiceConfirm = false;
    var userChoice = 'stand';

    // Storage
    var arr = []; // Player's Hand
    var DealerHand = []; // Dealer
    var total = 0; // Player Card Total
    var CardUp; // Dealer's Card Facing Up

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
        // Get total card sum
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


        var printFormat = arr.join(', '); // Set up print format

        // Send embed ouput
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
                    inline: false
                },
                ]
            }
        })
        setTimeout(() => {
            choiceReply();
        }, 2000)
        setTimeout(() => {
            if (userChoice == 'stand') {
                // message.reply('you picked stand. Good luck!');
                sendOutcome();
            }
            else {
                // message.reply('you picked tails. Good luck!');
                sendOutcome();
            }
        }, 4000);
    }

    // "User"
    function choiceReply() {
        var choice = Math.floor(Math.random() * 2);
        if (choice == 0)
            message.channel.send('stand');
        else {
            message.channel.send('stand');
            userChoice = 'stand';
        }
    }

    // ---------------------- HIT -------------------------
    function hit() {

        // Card that Player hit
        var newCard = deck.deal();
        arr.push(newCard); // Add to Player's Hand

        total = 0; // Reset total

        // Get new total
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

        var printFormat = arr.join(', '); // format array print

        // If the player did not bust, print embed
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

        // Otherwise, if the player busted, print bust embed and return
        if (total > 21) {
            busted();
            return;
        }

        // Hit or Stand
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

    } // ---------------------- HIT -------------------------

    // ---------------------- STAND -------------------------
    function sendOutcome() {

        DealerTotal = 0; // Find dealer's total

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

        // Dealer keeps hitting until sum is >= 17
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

        var printFormat = arr.join(', '); // Format print output for array
        var printFormatDealer = DealerHand.join(', '); // Format print output for array

        // Send hand embed output
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


    // Begin testing
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

    // Randomly shuffle the deck object
    deck.shuffle()

    // Get the Dealer's first card
    var dealerFirstCard = deck.deal();
    DealerHand.push(dealerFirstCard);

    // Get the Dealer's second card
    var dealerSecondCard = deck.deal();
    DealerHand.push(dealerSecondCard);

    CardUp = dealerSecondCard; // Show the Dealer's second card

    // PRINT CARDS 
    var firstCard = deck.deal();
    arr.push(firstCard); // Add to hand array

    var secondCard = deck.deal();
    arr.push(secondCard); // Add to hand array

    // // Get total card sum
    // for (i = 0; i < arr.length; i++) {
    //     var card = arr[i];

    //     var num = card.substring(0, 2);
    //     num = num.trim();
    //     console.log(num);
    //     if (num == 'Ja' || num == 'Qu' || num == 'Ki') {
    //         num = 10;
    //     } else if (num == 'Ac') {
    //         if (total <= 10) {
    //             num = 11;
    //         } else {
    //             num = 1;
    //         }
    //     }
    //     console.log(total);
    //     total += parseInt(num, 10);
    // }


    // var printFormat = arr.join(', '); // Set up print format

    // // Send embed ouput
    // message.channel.send({
    //     embed: {
    //         color: 0x000000, // Changes color of left-side line
    //         author: {
    //             name: client.user.username,
    //             icon_url: client.user.avatarURL
    //         },
    //         fields: [{
    //             name: "YOUR HAND",
    //             value: printFormat,
    //             inline: true
    //         },
    //         {
    //             name: "DEALER CARD UP",
    //             value: `${CardUp}`,
    //             inline: true
    //         }, {
    //             name: "NOW ENTER **HIT** OR **STAND**:",
    //             value: `**Total: ${total}**`,
    //             inline: false
    //         },
    //         ]
    //     }
    // })

    setTimeout(() => {
        betSend();
    }, 2000)

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max + 1));
    }

    // If CassyBot -> Test
    if (message.author == client.user) {
        buff.blackjack = true;
    }

}
config: { }