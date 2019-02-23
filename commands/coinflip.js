exports.run = (client, message, args) => {

    // Get Random (0 or 1)
    var coin = getRandomInt(1);

    // If 0 its Heads
    if (coin == 0) {
        message.channel.send("Pinging...").then(function (m) {
            m.edit(`:coin: **HEADS** - Took: ${m.createdTimestamp - message.createdTimestamp}ms`)
        })
    
        // Otherwise Tails
    } else {
        message.channel.send("Pinging...").then(function (m) {
            m.edit(` :coin: **TAILS** - Took: ${m.createdTimestamp - message.createdTimestamp}ms`)
        })
    }
}

// Returns Random Number 0 - Max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}
config: { }