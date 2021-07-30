const emoji = require("../config/emojis.json");

module.exports =
{
    name: "clear",
    description: "Clears all of the messages in the current text channel.",
    execute(message, args) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.messages.fetch()
                .then(function (list) {
                    message.channel.bulkDelete(list);
                    message.channel.send(`${emoji.AI_Tick} Deleted messages.`)
                        .then(msg => {
                            setTimeout(() => msg.delete(), 3000);
                        })
                }, function (err) {
                    message.channel.send(`${emoji.AI_Cross} There was an error when clearing messages.`)
                        .then(msg => {
                            setTimeout(() => msg.delete(), 3000);
                        })
                })
        }
    },
};