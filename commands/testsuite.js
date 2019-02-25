const buff = require('./testbuffer.js');

exports.run = async(client, message, args) => {
    message.channel.send('!help')
    var msg = await message.channel.awaitMessages(msg => msg.content.includes("help"), {time: 5000}); 
    
    console.log(buff.help)
    if(!buff.help){
        console.log(buff.help)
        message.channel.send('!terminate')
    }

    message.channel.send('!buggycommand')
    msg = message.channel.awaitMessages(msg => msg.content.includes("buggycommand"), {time: 5000});

    if(!buff.bug){
        console.log(buff.bug)
        message.channel.send('!terminate')
    }
}

config: {}