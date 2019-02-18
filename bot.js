const Discord = require("discord.js");
const client = new Discord.Client();
const login = require('./auth.json');
const config = require('./json/config.json');

client.on('ready', () => {
    console.log("Logged in, ready to go!");
    console.log(`Bot ID: ${client.user.tag}`);
    client.user.setActivity("with Team 3 in JavaScript"); // Changes bot activity
});

client.on('message', message => {

    if (!message.content.startsWith(config.prefix) || message.author.bot)
        return;

    // Remove '!' from command
    const args = message.content.slice(config.prefix.length).trim().split(/ + /g);

    // Change command to lower case (i.e. !pInG = !ping)
    const command = args.shift().toLowerCase();

    // Run command file
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        // Error - Print to Console
        console.error(err);
    }
});

client.login(config.token);
