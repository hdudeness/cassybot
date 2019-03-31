exports.run = (client, message, args) => {
    const Discord = require("discord.js");
    var colors = [0x115DA8, 0xDC143C, 0xFF4500, 0xFFD700, 0x00FF00];

    let slots = ["🍎", "🍌", "🍊", "🍐", "🍒"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let icon = message.author.displayAvatarURL;

    if (slots[result1] == slots[result2] && slots[result3]) {
        let wEmbed = new Discord.RichEmbed()
            .setFooter('You won!', icon)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(colors[Math.floor(Math.random() * colors.length)])
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