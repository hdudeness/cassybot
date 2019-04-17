exports.run = (client, message, args) => {

    // General setup
    const Discord = require("discord.js");
    const buff = require('./testbuffer.js');

    // Credit system
    var currency = client.getCredits.get(message.author.id);
    const Database = require("better-sqlite3");
    const db = new Database('./user_data/currency.sqlite');

    // Testing variables
    var betValueTest = false;
    var choiceValueTest = false;
    var dbCheck = false;


    // getUserInput variables
    var betConfirm = false;
    var userChoice = 'h';
    var bet = 1;

    function getUserInput() {
        // Make sure the user is in the database.
//     if (!currency) {
//            message.reply(`welcome! I will give you 100 credits to start.`);
//            currency = {
//                id: message.author.id,
//               user: message.author.username,
//                credits: 100
//            }
//            client.setCredits.run(currency);
//        }   
        // Get bet amount
        if (!betConfirm) {
            const betCollector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 100000 });
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
                        value: `This is a simple game that I provide. You will select a bet amount and then pick one of three colors
                                This is a standard 37 slot roulette wheel with 18 Red, 18 Black, and 1 Green spot`,
                        inline: true
                    },
                    {
                        name: "WININGS",
                        value: `The amount you win when your guess is correct depends on what color you pick
                                **RED** and **Black** win your bet amount
                                **GREEN** wins you big with 36X your bet amount`,
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
                    return message.reply(`your bet must be greater than zero! Run **!roulette** again.`);
                }
                else if (isNaN(message.content)) {
                    betCollector.stop([console.log("Incorrect user syntax.")])
                    return message.reply(`that is not a valid number! Run **!roulette** again.`);
                }
                else {
                    bet = parseInt(message.content);

                    // Test if stored bet amount matches user input
                    if (bet == message.content)
                        betValueTest = true;
                    else
                        betValueTest = false;

                    betCollector.stop([console.log("Bet recieved.")])
                    message.reply(`your bet is **` + bet + ` credits!**`);

                    if (currency.credits < bet) {
                        betCollector.stop(console.log("Not enough user credits."))
                        message.reply(`you don't have enough credits! You currently have ${currency.credits} credits. Run !roulette again!`);
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
                        color: 0xFFA500, // Changes color of left-side line
                        description: `Now enter **red** or **black** or **green**:`
                    }
                }
            );
            console.log(choiceCollector);
            choiceCollector.on('collect', message => {
                if (message.content.toLowerCase() == "red" || message.content.toLowerCase() == 'r') {
                    userChoice = 'red';

                    // Test if choice value matches user input
                    if ((message.content.toLowerCase() == "red" || "r") && userChoice == "red")
                        choiceValueTest = true;
                    else
                        choiceValueTest = false;

                    choiceCollector.stop([console.log("User picked red.")]);
                    message.reply(`you picked red. Good luck!`);
                    spinWheel();
                }
                else if (message.content.toLowerCase() == "black" || message.content.toLowerCase() == "b") {
                    userChoice = 'black';

                    // Test if choice value matches user input
                    if ((message.content.toLowerCase() == "black" || "b") && userChoice == "black")
                        choiceValueTest = true;
                    else
                        choiceValueTest = false;

                    choiceCollector.stop([console.log("User picked black.")]);
                    message.reply(`you picked black. Good luck!`);
                    spinWheel();
                }
                else if (message.content.toLowerCase() == "green" || message.content.toLowerCase() == "g") {
                    userChoice = 'green';

                    // Test if choice value matches user input
                    if ((message.content.toLowerCase() == "green" || "g") && userChoice == "green")
                        choiceValueTest = true;
                    else
                        choiceValueTest = false;

                    choiceCollector.stop([console.log("User picked green.")]);
                    message.reply(`you picked green. Good luck!`);
                    spinWheel();
                }
                else {
                    choiceSyntaxTest = true;
                    choiceCollector.stop([console.log("Incorrect user syntax.")])
                    return message.reply(`try saying "red" or "black"! Run !roulette again.`);
                }
            })
        }
    }

    // Get outcome, take/give credits based on user choice.
    function spinWheel() {
        var wheelSlot = getRandomInt(36);
        var win = false;

        message.channel.send({
            files: [
                "./images/roulette.gif" // Image to send
            ]
        });
        setTimeout(() => {
            if(wheelSlot == 0){
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
            setTimeout(() => {
                // green win
                if (wheelSlot == 0 && userChoice == "green"){
                    win = true;
                    // Update database
                    db.exec("UPDATE currency SET credits = credits + " + bet * 16 + " WHERE id = " + message.author.id + ";");
                    message.reply(`you won ** ${bet*16} credits!** You now have ${(currency.credits + bet*36)} credits.`);
                }
                // red win
                else if (wheelSlot >= 1 && wheelSlot <= 16 && userChoice == "red"){
                    win = true;
                    // Update database
                    db.exec("UPDATE currency SET credits = credits + " + bet + " WHERE id = " + message.author.id + ";");
                    message.reply(`you won ** ${bet} credits!** You now have ${currency.credits + bet} credits.`);
                }
                // black win
                else if (wheelSlot >= 17 && wheelSlot <= 36 && userChoice == "black"){
                    win = true;
                    // Update database
                    db.exec("UPDATE currency SET credits = credits + " + bet + " WHERE id = " + message.author.id + ";");
                    message.reply(`you won ** ${bet} credits!** You now have ${currency.credits + bet} credits.`);
                }
                //loss
                else{
                    win = false;
                    // Update database
                    db.exec("UPDATE currency SET credits = credits " + ((win) ? "+" : "-") + " " + bet + " WHERE id = " + message.author.id + ";");
                    message.reply(`you lost ** ${bet} credits!** You now have ${currency.credits - bet} credits.`);
                }
                

                // Check database
                var newCurrency = client.getCredits.get(message.author.id);
                if (newCurrency.credits == ((win) ? (currency.credits + bet || currency.credits + bet * 36) : currency.credits - bet))
                    dbCheck = true;

                printTests();
            }, 1000);
        }, 3000);
    }

    function printTests() {
        console.log("\n");
        console.log("******roulette TESTS******");
        console.log("betValueTest: " + ((betValueTest) ? "PASSED" : "FAILED"));
        console.log("choiceValueTest: " + ((choiceValueTest) ? "PASSED" : "FAILED"));
        console.log("dbCheck: " + ((dbCheck) ? "PASSED" : "FAILED"));
        console.log("\n");
    }

    getUserInput();

    // If CassyBot -> Test
    if (message.author == client.user) {
        buff.roulette = true;
    }
}

// Returns Random Number 0 - Max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}
config: { }