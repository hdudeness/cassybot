const deck = require("./deck.js");

exports.run = (client, message, args) => {
    
    var card = deck.deal();

    message.channel.send("Pinging...").then(function(m){
        m.edit(` 🎰 **DEALING** 🎰 ${card}- Took: ${m.createdTimestamp - message.createdTimestamp}ms`)
        
    })

}
config: {}