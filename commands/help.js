exports.run = (client, msg, args) => {

    msg.channel.send({
        embed: {
            color: 0xd4de65,
            author: {
                name: client.user.username + " Help",
                icon_url: client.user.avatarURL
            },
            description: 'This is a list of everything I can do!',
            fields: [{
                name: "All commands!",
                value: '!help - This command. \n!ping - Pong',
                inline: true
            }
            ]
        }
    })
}