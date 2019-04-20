const deck = require("./deck.js");
const buff = require('../testbuffer.js');

exports.run = (client, message, args) => {

    var card = deck.shuffle(message.author.id);

    message.channel.send("Pinging...").then(function(m){
        m.edit(` 🎰 **SHUFFLING** 🎰 - Took: ${m.createdTimestamp - message.createdTimestamp}ms`)
    })

    // If CassyBot -> Test
    if (message.author == client.user) {

        buff.shuffle = true;
        console.log(buff.shuffle);
    }

}
config: {}