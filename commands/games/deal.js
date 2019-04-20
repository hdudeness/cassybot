const deck = require("./deck.js");
const buff = require('../testbuffer.js');

exports.run = (client, message, args) => {

    var card = deck.deal(message.author.id);

    message.channel.send("Pinging...").then(function (m) {
        m.edit(` 🎰 **DEALING** 🎰 ${card}- Took: ${m.createdTimestamp - message.createdTimestamp}ms`)

    })

    // If CassyBot -> Test
    if (message.author == client.user) {

        buff.deal = true;
        console.log(buff.deal);
    }
}
config: { }