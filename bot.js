const Discord = require("discord.js");
const client = new Discord.Client();
const login = require('./auth.json');
const config = require('./json/config.json');

client.on("ready", () => {
    console.log("Logged in, ready to go!");
});

client.on("message", (message) => {

    if (!message.content.startsWith(config.prefix) || message.author.bot)
        return;

    if (message.content.startsWith(config.prefix + "ping")) {
        message.channel.send("Pong!");
    }
});

client.login(config.token);
