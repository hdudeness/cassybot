exports.run = (client, message, args) => {
    // DELETE BELOW
    message.channel.send("Pinging...").then(function(m){
        m.edit(`WELCOME TO THE SANDBOX!! If you have questions -- ASK TYLER - Took: ${m.createdTimestamp - message.createdTimestamp}ms`)
    })
    
    // CODE GOES HERE


}
config: {}