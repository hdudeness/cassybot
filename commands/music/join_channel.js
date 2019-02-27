const commando = require('discord.js-commando');

class JoinChannelCommand extends commando.Command{
    async run(message, args){
        message.member.voiceChannel.join();
    }
}