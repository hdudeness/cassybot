const buff = require('./testbuffer.js');

exports.run = (client, message, args) => {
    
    let currency = client.getCredits.get(message.author.id);
    
    // If a user does not exist in the database, add them.
    if (!currency) {
        currency = {
            id: message.author.id,
            user: message.author.id,
            // Starting amount, can be changed freely.
            credits: 100
        }
        client.setCredits.run(currency);
    }

    message.channel.send({
        embed: {
            color: 0x39ff14,
            author: {
                name: client.user.username + " Leaderboards",
                icon_url: client.user.avatarURL
            },
            description: 'Here is how you stack up against your friends!',
            fields: [{
                name: "**TOP 10**",
                value: 
                `**#1 🥇 ${message.author}** - ${currency.credits} credits!
                **#2 🥈 N/A** - N/A credits
                **#3 🥉N/A** - N/A credits
                **#4 N/A** - N/A credits
                **#5 N/A** - N/A credits
                **#6 N/A** - N/A credits
                **#7 N/A** - N/A credits
                **#8 N/A** - N/A credits
                **#9 N/A** - N/A credits
                **#10 N/A** - N/A credits`,
                inline: true
            },
            {
                name: "**YOUR POSITION**",
                value: `**Congratulations! #1 ${message.author}** - ${currency.credits} credits\n`,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                icon_url: message.author.avatarURL,
                text: `Requested by ${message.author.tag}`
            }
        }
    })  

    // If CassyBot -> Test
    if (message.author == client.user) {
       
        buff.leader = true; 
        console.log(buff.leader);
    }
}
  