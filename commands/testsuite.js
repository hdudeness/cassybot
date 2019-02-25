const buff = require('./testbuffer.js');

exports.run = async(client, message, args) => {
    
    // TEST HELP
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!help')
    const msg = await message.channel.awaitMessages(() => true, {time: 3000}); 

    if(!buff.help){
        console.log(buff.help)
        message.reply('**ERROR**')
        return;
    } else {
        message.channel.send('**Passed**');
    }
    
    // TEST COINFLIP
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!coinflip')
    const msgCoin = await message.channel.awaitMessages(() => true, {time: 3000});

    if(!buff.coin){
        console.log(buff.coin)
        message.reply('**ERROR**')
        return;
    } else {
        message.channel.send('**Passed**');
    }

    // TEST LIKE
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!like')
    const msgLike = await message.channel.awaitMessages(msgLike => msgLike.content.includes("Like"), {time: 3000});

    if(!buff.like){
        console.log(buff.like)
        message.reply('**ERROR**')
        return;
    } else {
        message.channel.send('**Passed**');
    }

    // TEST LIKE
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!ping')
    const msgPing = await message.channel.awaitMessages(msgPing => msgPing.content.includes("ping"), {time: 3000});

    if(!buff.ping){
        console.log(buff.ping)
        message.reply('**ERROR**')
        return;
    } else {
        message.channel.send('**Passed**');
    }

    // BUGGY TEST -- INTENTIONAL
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!buggycommand')
    const msgBug = await message.channel.awaitMessages(msgBug => msgBug.content.includes("buggycommand"), {time: 3000});

    if(!buff.bug){
        console.log(buff.bug)
        message.reply('**ERROR**')
        return;
    } else {
        message.channel.send('**Passed**');
    }
}

config: {}