const buff = require('./testbuffer.js');

exports.run = (client, message, args) => {

    console.log(message.author.id)
    // --Credits setup--
    let currency = client.getCredits.get(message.author.id);

     // If CassyBot -> Test
     if (message.author == client.user) {

        buff.credits = true;
        console.log(buff.credits);
    }

    // Command to check the amount of credits you have - TODO: make credits.js file in commands folder.
    return message.reply(`You have ${currency.credits} credits!`);
}

config: { }