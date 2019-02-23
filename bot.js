const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./json/config.json');

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