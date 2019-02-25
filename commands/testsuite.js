const buffer = require('./testbuffer.js');

exports.run = async(client, message, args) => {
    message.channel.send('!help')
    const msg = await message.channel.awaitMessages(msg => msg.content.includes("help"), {time: 5000}); 
    
    if(!buffer.testHelp){
        console.log(buffer.testHelp)
        message.channel.send('!terminate')
    }
}

config: {}