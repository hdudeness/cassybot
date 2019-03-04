const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./json/config.json');

// MUSIC
const fs = require("fs");
const prefix = config.prefix;
var ytconfig = JSON.parse(fs.readFileSync('./json/settings.json', 'utf-8'));

// SQL
const SQLite = require("better-sqlite3");
const sql = new SQLite('./user_data/currency.sqlite');

client.on('ready', () => {
    // Prepare SQL table for user currency
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'currency';").get();
    if (!table['count(*)']) {
        // Check to see if the table exists, if it doesn't then set it up
        sql.prepare("CREATE TABLE currency (id TEXT PRIMARY KEY, user TEXT, credits INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_currency_id ON currency (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    // Getters and setters for credits data
    client.getCredits = sql.prepare("SELECT * FROM currency WHERE user = ?");
    client.setCredits = sql.prepare("INSERT OR REPLACE INTO currency (id, user, credits) VALUES (@id, @user, @credits);");

    // Logging in
    console.log("Logged in, ready to go!");
    console.log(`Bot ID: ${client.user.tag}`);
    client.user.setActivity("with Team 3 in JavaScript", { type: `STREAMING`, url: `https://www.twitch.tv/stairs_nooo` }); // Changes bot activity
});

client.on('message', message => {

    const member = message.member;
    const ytmessage = message.content.toLowerCase();
    const ytargs = message.content.split(' ').slice(1).join(" ");
    
    // Remove '!' from command
    const args = message.content.slice(config.prefix.length).trim().split(/ + /g);

     // Change command to lower case (i.e. !pInG = !ping)
     const command = args.shift().toLowerCase().split(" ")[0]

    // MUSIC
    if (ytmessage.startsWith(prefix + "play" || prefix + "leave")) {
        try {
            let commandFile = require(`./commands/music/${command}.js`);
            commandFile.run(client, message, args, config, member, ytmessage, ytargs, ytconfig);
        } catch (err) {

            // Error - Print to Console
            console.error(err);
        }
    } else {


        // Log Message in Console 
        console.log(message.content);

        // If Someones Flips a Table
        if (message.content == '(╯°□°）╯︵ ┻━┻') {
            // Unflip Table
            message.channel.send('┬─┬ ノ( ゜-゜ノ)');
            message.channel.send('Please **DON\'T** flip tables. This is a professionally organized server. If you want to flip tables you may leave.');
        }

        console.log(' ')
        console.log('--------------------')
        console.log(message.author.username + " || User ID: " + client.user.id + " || Channel ID: " + message.channel.id)
        if (!message.content.startsWith(config.prefix) || (message.author.bot && (message.author != client.user)))
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

            if (message.author != client.user) {
                message.reply('Sorry! That is not a command that I know. Say **!help** to receive a list of commands I know!');
            }

            // Error - Print to Console
            console.error(err);
        }
    }
});

client.login(config.token);