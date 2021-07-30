const emojis = require("../config/emojis.json");
const config = require("../config/config.json");

module.exports =
{
    name: "hug",
    description: "Send virtual hugs to someone! <3",
    execute(message, args) {
        const lucky = message.mentions.members.first();
        if (!lucky) {
            message.lineReply(`${emojis.AI_Cross} Please mention a user to hug (aka the lucky person) !`);
            return;
        }

        if (lucky == message.member) {
            message.lineReply(`A-are y-you okay buddy? :pleading_face: Let me hug you ${emojis.BulbaOwO}`);
            return;
        }

        if (lucky.id == config.thisID) {
            message.lineReply(`Thanks for hugging me! I love you ${emojis.BulbaOwO}`);
            return;
        }

        message.lineReply(`${emojis.AI_Tick} Sending virtual hugs...`)
            .then(setTimeout(() => {
                message.channel.send(`${message.author} just hugged ${lucky}! :heart: Aww ${emojis.BulbaOwO}`);
            }, 2300));
    }
}