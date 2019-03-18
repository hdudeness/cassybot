exports.run = (client, message, args) => {
    message.channel.send("Pinging...").then(function(m){
        m.edit(` 🎰 **Blackjack** 🎰 - Took: ${m.createdTimestamp - message.createdTimestamp}ms`)
    })

}
config: {}