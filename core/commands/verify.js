const emojis = require("../config/emojis.json")
const channels = require("../config/channels.json");
const roles = require("../config/roles.json");

module.exports =
    {
        name: "verify",
        description: "Verify yourself to gain access to the server.",
        execute(message, args) {
            const member = message.member;
            const role = member.roles.cache.find(r => r.name === ".");
            if (role) {
                message.lineReply(`By verifying, you accept the <#${channels.rules}>\nPlease type \`ai accept\` to continue.`);
            } else {
                if (!member.roles.cache.find(r => r.name === "Futurist")) {
                    message.lineReply(`${emojis.AI_Cross} **Failed to verify due to expiration!** Please re-join this server (https://futureblur.com/dsc) and try again within 20 minutes.`)
                } else {
                    message.lineReply(`${emojis.AI_Cross} You have already accepted the terms of service.`);
                }
            }
        }
    }