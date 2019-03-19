const deck = require("./deck.js");

exports.run = (client, message, args) => {

    var card = deck.shuffle();

    message.channel.send("Pinging...").then(function(m){
        m.edit(` 🎰 **SHUFFLING** 🎰 - Took: ${m.createdTimestamp - message.createdTimestamp}ms`)
    })

}
config: {}