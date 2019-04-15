exports.run = (client, message, args) => {
    const Discord = require("discord.js");
    var colors = [0x115DA8, 0xDC143C, 0xFF4500, 0xFFD700, 0x00FF00];

    // Credit system
    var currency = client.getCredits.get(message.author.id);
    const Database = require("better-sqlite3");
    const db = new Database('./user_data/currency.sqlite');

     //Win variables
     var smwin = 10;        //small win
     var bwin = 100;        //big win

    let slots = ["🍎", "🍌", "🍊", "🍐", "🍒"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let icon = message.author.displayAvatarURL;

    if (slots[result1] === slots[result2] && slots[result2] === slots[result3]) {
        let wEmbed = new Discord.RichEmbed()
            .setFooter('You won!', icon)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(colors[Math.floor(Math.random() * colors.length)])
            db.exec("UPDATE currency SET credits = credits + " + bwin + " WHERE id = " + message.author.id + ";");
            message.reply(`you won `+ `**` + bwin + ` credits!** You now have ${currency.credits + bwin} credits.`);
        message.channel.send(wEmbed)
    }

    else if (slots[result1] === slots[result2]) {
        let wEmbed = new Discord.RichEmbed()
            .setFooter('You won!', icon)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(colors[Math.floor(Math.random() * colors.length)])
            db.exec("UPDATE currency SET credits = credits + " + smwin + " WHERE id = " + message.author.id + ";");
            message.reply(`you won `+ `**` + smwin + ` credits!** You now have ${currency.credits + smwin} credits.`);
        message.channel.send(wEmbed)
    }
    else {
        let lEmbed = new Discord.RichEmbed()
            .setFooter('You lost!', icon)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(colors[Math.floor(Math.random() * colors.length)])
        message.channel.send(lEmbed)
    }
}
config: { }