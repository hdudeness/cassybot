exports.run = (client, message, args) => {
    message.channel.send("Pinging...").then(function(m){
        m.edit(` :ping_pong: **Pong!** - Took: ${m.createdTimestamp - message.createdTimestamp}ms`)
    })
}
config: {}
