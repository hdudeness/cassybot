const buff = require('../testbuffer.js');
exports.run = (client, message, args) => {
    message.channel.send({
        embed: {
            color: 0xfcce01, // Changes color of left-side line
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            description: "This is an embed.",
            fields: [{
                name: "Field 1",
                value: `Type your text right here`,
                inline: true
            },
            {
                name: "Field 2",
                value: `Insert your links right here; you can also put text links like [this](https://github.com/tjmareng).`,
                inline: true
            }, {
                name: "Field 3",
                value: `Type bold comments like this: **markdown**.`,
                inline: true
            },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: message.author.avatarURL,
                text: `Requested by ${message.author.tag}`
            }
        }
        // This is an example of an edit.
    }).then((msg) => {
        setTimeout(() => {
            msg.edit({
                embed: {
                    color: 0xfcce01, // Changes color of left-side line
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    description: "This is an embed.",
                    fields: [{
                        name: "Field 1",
                        value: `Type your text right here`,
                        inline: true
                    },
                    {
                        name: "Field 2",
                        value: `Insert your links right here; you can also put text links like [this](https://github.com/tjmareng).`,
                        inline: true
                    }, {
                        name: "Field 3",
                        value: `**HERE IS THE CHANGE**.`,
                        inline: true
                    },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `Requested by ${message.author.tag}`
                    }
                }
            });
        }, 3000);
    })

    // If CassyBot -> Test
    if (message.author == client.user) {

        buff.embed = true;
        console.log(buff.embed);
    }
}
config: { }