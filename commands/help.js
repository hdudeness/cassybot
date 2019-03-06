const buff = require('./testbuffer.js');

exports.run = (client, message, args) => {
    message.channel.send({
        embed: {
            color: 0x800080,
            author: {
                name: client.user.username + " Help Services",
                icon_url: client.user.avatarURL
            },
            description: 'This is a list of everything I can do!',
            fields: [{
                name: "**ALL COMMANDS**",
                value: '**!help** - This command. \n' +
                    '**!credits** - Displays user\'s credits.\n' +
                    '**!ping** - Pong\n' +
                    '**!coinflip** - Flips a coin... Heads or Tails?\n' +
                    '**!leaderboards** - Displays Top 10 and user\'s rank.\n' +
                    '**!report** [TO DO]\n' +
                    '**!kick** [TO DO]\n' +
                    '**!embed** [EDIT] - Template\n',
                inline: true
            },
            {
                name: "**GAMES**",
                value: '**!coinflip** - Flips a coin... Heads or Tails?\n',
                inline: true
            },
            {
                name: "**MUSIC**",
                value: `**!play <SONG>** - Plays the audio to the given song. (YouTube URL or song info) \n` +
                '**!leave** - Kicks CassyBot from the voice call. \n' +
                '**!skip** - Skips the current song. \n' +
                '',
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
        buff.help = true;
    }
}