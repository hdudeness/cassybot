const fs = require('fs');

exports.run = (client, message, args) => {

    var arr = [];
    arr[0] = "./Images/cards/1c.png";
    arr[1] = "./Images/cards/1d.png";

    for (const item of arr) {
        message.channel.send({files: [`${item}`]}).catch(console.error);
    }
    
    message.channel.send({
        embed: {
            color: 0x000000, // Changes color of left-side line
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            fields: [{
                name: "YOUR HAND\n",
                value: arr,
                inline: true
            }]
        }
    })
}
config: {}
