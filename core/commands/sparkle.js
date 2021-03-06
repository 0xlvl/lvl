const emojis = require("../config/emojis.json");

module.exports = {
    name: "sparkle",
    description: "Decorate your messages with sparkles!",
    execute(message, args) {
        if (!args[0]) {
            message.lineReply(`${emojis.AI_Cross} Please specify your message!`);
            return;
        }

        let msg = "";

        for (const word of args) {
            msg += word + " ";
        }

        const decorated = `**✨ ${msg}✨**`;

        message.delete();
        message.channel.send(decorated);
    }
}