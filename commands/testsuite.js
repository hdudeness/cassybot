const buff = require('./testbuffer.js');
const fs = require('fs');

exports.run = async(client, message, args) => {
    
    // // TEST HELP
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!help')
    const msg = await message.channel.awaitMessages(msg => message.content.includes("help"), {time: 5000}); 

    if(!buff.help){
        console.log(buff.help)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Help - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Help - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }
    
    // TEST COINFLIP
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!cointest');
    const msgCoin = await message.channel.awaitMessages(msgCoin => message.content.includes("cointest"), {time: 15000});

    if(!buff.coin){
        console.log(buff.coin)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Coinflip - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Coinflip - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    /*
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
    */
   
    // TEST PING
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!ping')
    const msgPing = await message.channel.awaitMessages(msgPing => message.content.includes("ping"), {time: 5000});

    if(!buff.ping){
        console.log(buff.ping)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Ping - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Ping - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    // TEST TABLEFLIP
    message.channel.send('-------------------------------------------------------')
    message.channel.send('(╯°□°）╯︵ ┻━┻')
    const msgTable= await message.channel.awaitMessages(msgTable => message.content.includes("(╯°□°）╯︵ ┻━┻"), {time: 5000});

    if(!buff.table){
        console.log(buff.table)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Tableflip - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Tableflip - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    // TEST NO COMMAND
    // message.channel.send('-------------------------------------------------------')
    // message.channel.send('!NOTACOMMAND')
    // const msgNa= await message.channel.awaitMessages(msgNa => message.content.includes(""), {time: 5000});

    // if(!buff.na){
    //     console.log(buff.na)
    //     message.reply('**ERROR**')
    //     return;
    // } else {
    //     message.channel.send('**Passed**');
    // }

    // TEST LEADERBOARDS
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!leaderboards')
    const msgLeader= await message.channel.awaitMessages(msgLeader => message.content.includes("leaderboards"), {time: 5000});
    
    if(!buff.leader){
        console.log(buff.leader)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Leaderboards - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Leaderboards - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    // BUGGY TEST -- INTENTIONAL
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!buggycommand')
    const msgBug = await message.channel.awaitMessages(msgBug => msgBug.content.includes("buggycommand"), {time: 5000});

    if(!buff.bug){
        console.log(buff.bug)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Bug - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Bug - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }
}

config: {}