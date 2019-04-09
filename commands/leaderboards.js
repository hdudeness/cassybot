const buff = require('./testbuffer.js');
const Database = require("better-sqlite3");
const db = new Database('./user_data/currency.sqlite');

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
    var leaders = db.prepare("SELECT user, credits FROM currency ORDER BY credits DESC LIMIT 10");
    var users = db.prepare("SELECT id, user, credits FROM currency ORDER BY credits DESC");
 
    var temp = leaders.all();
    var user = users.all();
    var index;
    for(var i = 0; i < user.length; i++){
        if(user[i].id == message.author.id){
            index = i;
            break;
        }
    }
    console.log(index);
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
                `**#1 🥇 ${(temp.length >=  1) ? temp[0].user: "N/A"}** - ${(temp.length >=  1) ? temp[0].credits: "N/A"} credits!
                **#2 🥈 ${(temp.length >=  2) ? temp[1].user: "N/A"}** - ${(temp.length >=  2) ? temp[1].credits: "N/A"} credits!
                **#3 🥉${(temp.length >=  3) ? temp[2].user: "N/A"}** - ${(temp.length >=  3) ? temp[2].credits: "N/A"} credits!
                **#4 ${(temp.length >=  4) ? temp[3].user: "N/A"}** - ${(temp.length >=  4) ? temp[3].credits: "N/A"} credits!
                **#5 ${(temp.length >=  5) ? temp[4].user: "N/A"}** - ${(temp.length >=  5) ? temp[4].credits: "N/A"} credits!
                **#6 ${(temp.length >=  6) ? temp[5].user: "N/A"}** - ${(temp.length >=  6) ? temp[5].credits: "N/A"} credits!
                **#7 ${(temp.length >=  7) ? temp[6].user: "N/A"}** - ${(temp.length >=  7) ? temp[6].credits: "N/A"} credits!
                **#8 ${(temp.length >=  8) ? temp[7].user: "N/A"}** - ${(temp.length >=  8) ? temp[7].credits: "N/A"} credits!
                **#9 ${(temp.length >=  9) ? temp[8].user: "N/A"}** - ${(temp.length >=  9) ? temp[8].credits: "N/A"} credits!
                **#10 ${(temp.length >=  10) ? temp[9].user: "N/A"}** - ${(temp.length >=  10) ? temp[9].credits: "NA"} credits!`,
                inline: true
            },
            {
                name: "**YOUR POSITION**",
                value: `**#${index+1} ${user[index].user}** - ${user[index].credits} credits\n`,
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
  