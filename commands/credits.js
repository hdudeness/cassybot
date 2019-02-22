exports.run = (client, message, args) => {
    // --Credits setup--
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
    // Command to check the amount of credits you have - TODO: make credits.js file in commands folder.
    return message.reply(`You have ${currency.credits} credits!`);

}
config: { }