const buff = require('./testbuffer.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

    // // TEST HELP
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!help')
    buff.numTested += 1;
    const msg = await message.channel.awaitMessages(msg => message.content.includes("help"), { time: 5000 });

    if (!buff.help) {
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

    // TEST BLACKJACK
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!blackjacktest');
    buff.numTested += 1;
    const msgBlackjack = await message.channel.awaitMessages(msgBlackjack => message.content.includes("blackjacktest"), { time: 15000 });

    if (!buff.blackjack) {
        console.log(buff.blackjack)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Blackjack - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Blackjack - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    // TEST COINFLIP
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!cointest');
    buff.numTested += 1;
    const msgCoin = await message.channel.awaitMessages(msgCoin => message.content.includes("cointest"), { time: 15000 });

    if (!buff.coin) {
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

    // TEST SLOT
    // setTimeout(() => {
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!slot');
    buff.numTested += 1;
    const msgSlot = await message.channel.awaitMessages(msgSlot => message.content.includes("slot"), { time: 15000 });

    if (!buff.slot) {
        console.log(buff.slot)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Slot - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Slot - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    //}, 5000)

    // TEST SHUFFLE
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!shuffle')
    buff.numTested += 1;
    const msgShuff = await message.channel.awaitMessages(msgShuff => message.content.includes("shuffle"), { time: 5000 });

    if (!buff.shuffle) {
        console.log(buff.shuffle)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Shuffle - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Shuffle - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    // TEST DEAL
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!deal')
    buff.numTested += 1;
    const msgDeal = await message.channel.awaitMessages(msgDeal => message.content.includes("shuffle"), { time: 5000 });

    if (!buff.deal) {
        console.log(buff.deal)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Deal - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Deal - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    // TEST CREDITS
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!credits')
    buff.numTested += 1;
    const msgCred = await message.channel.awaitMessages(msgCred => message.content.includes("shuffle"), { time: 5000 });

    if (!buff.credits) {
        console.log(buff.credits)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Credits - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Credits - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    // TEST PING
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!ping')
    buff.numTested += 1;
    const msgPing = await message.channel.awaitMessages(msgPing => message.content.includes("ping"), { time: 5000 });

    if (!buff.ping) {
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

    // TEST EMBED
    message.channel.send('-------------------------------------------------------')
    message.channel.send('!embed')
    buff.numTested += 1;
    const msgEmbed = await message.channel.awaitMessages(msgEmbed => message.content.includes("embed"), { time: 5000 });

    if (!buff.embed) {
        console.log(buff.embed)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Embed - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        message.channel.send('**Passed**');
        fs.appendFile('testsuite.txt', `Test Embed - Passed\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
    }

    // TEST TABLEFLIP
    message.channel.send('-------------------------------------------------------')
    message.channel.send('(╯°□°）╯︵ ┻━┻')
    buff.numTested += 1;
    const msgTable = await message.channel.awaitMessages(msgTable => message.content.includes("(╯°□°）╯︵ ┻━┻"), { time: 5000 });

    if (!buff.table) {
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
    buff.numTested += 1;
    const msgLeader = await message.channel.awaitMessages(msgLeader => message.content.includes("leaderboards"), { time: 5000 });

    if (!buff.leader) {
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

    // TEST ROULETTE

    message.channel.send('-------------------------------------------------------')
    message.channel.send('!roulettetest');
    buff.numTested += 1;
    const msgRoul = await message.channel.awaitMessages(msgRoul => message.content.includes("roulettetest"), { time: 15000 });

    if (!buff.coin) {
        console.log(buff.roulette)
        message.reply('**ERROR**')
        fs.appendFile('testsuite.txt', `Test Roulette - !!!ERROR!!!\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });
        return;
    } else {
        setTimeout(() => {
            message.channel.send('**Passed**');
            fs.appendFile('testsuite.txt', `Test Roulette - Passed\n`, function (err) {
                if (err) {
                    console.log('Unable to write to file');
                }
            });
        }, 7000);
    }

    setTimeout(() => {
        var codeCoverage = buff.numTested / total * 100;
        var Passed = buff.numTested;

        message.channel.send({
            embed: {
                color: 0x000, // Changes color of left-side line
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                description: "Output Results for Testing Suite.",
                fields: [{
                    name: "Tests Passed",
                    value: Passed,
                    inline: true
                },
                {
                    name: "Code Coverage",
                    value: codeCoverage + `%`,
                    inline: true
                }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `Requested by ${message.author.tag}`
                }
            }
            // This is an example of an edit.
        })
        //message.channel.send(`Code Coverage: ${codeCoverage}\n`);
        fs.appendFile('testsuite.txt', `Code Coverage: ${codeCoverage}%\n`, function (err) {
            if (err) {
                console.log('Unable to write to file');
            }
        });

    }, 7000);

    // // BUGGY TEST -- INTENTIONAL
    // message.channel.send('-------------------------------------------------------')
    // message.channel.send('!buggycommand')
    // const msgBug = await message.channel.awaitMessages(msgBug => msgBug.content.includes("buggycommand"), { time: 5000 });

    // if (!buff.bug) {
    //     console.log(buff.bug)
    //     message.reply('**ERROR**')
    //     fs.appendFile('testsuite.txt', `Test Bug - !!!ERROR!!!\n`, function (err) {
    //         if (err) {
    //             console.log('Unable to write to file');
    //         }
    //     });
    //     return;
    // } else {
    //     message.channel.send('**Passed**');
    //     fs.appendFile('testsuite.txt', `Test Bug - Passed\n`, function (err) {
    //         if (err) {
    //             console.log('Unable to write to file');
    //         }
    //     });
    // }

    var total = 15.0;
}

config: { }