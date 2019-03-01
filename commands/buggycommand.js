const buffer = require('./testbuffer.js');

exports.run = (client, message, args) => {
    var i = 5;
    while (i != 0) {
        // infinite loop
        message.channel.send('**HELLO**');
        i--;
    }
}

// IM THE BUG -- MESSAGE IS OUTSIDE BRACKETS SO ITS NOT DEFINED
if (message.author == client.user) {
    buffer.bug = true;
}
