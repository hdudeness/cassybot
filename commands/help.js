exports.run = (client, message, args) => {

    message.channel.send({
        embed: {
            color: 0xd4de65,
            author: {
                name: client.user.username + " Help",
                icon_url: client.user.avatarURL
            },
            description: 'This is a list of everything I can do!',
            fields: [{
                name: "**ALL COMMANDS**",
                value: '**!help** - This command. \n' +
                    '**!credits** - Displays user\'s credits.\n' +
                    '**!ping** - Pong\n' +
                    '**!coinflip**\n' +
                    '**!leaderboards** [TO DO]\n' +
                    '**!report** [TO DO]\n' +
                    '**!kick** [TO DO]\n' +
                    '**!embed** [EDIT]\n',
                inline: true
            },
            {
                name: "**GAMES**",
                value: `11`,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                icon_url: message.author.avatarURL,
                text: `Requested by ${message.author.tag}`
            }
        }
    })
}