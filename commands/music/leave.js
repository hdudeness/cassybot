exports.run = (client, message, args, config, member, ytmessage, ytargs, ytconfig) => {
    if (ytmessage.startsWith(prefix + "leave")) {
        message.member.voiceChannel.leave();
    }
}