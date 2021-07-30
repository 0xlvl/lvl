const emojis = require("../config/emojis.json")
const channels = require("../config/channels.json");
const roles = require("../config/roles.json");

module.exports =
{
    name: "accept",
    description: "Accept the TOS to gain access to the server.",
    execute(message, args) {
        const member = message.member;
        const tempRole = member.roles.cache.find(r => r.name === ".");
        if (tempRole && !member.roles.cache.find(r => r.name === "Futurist")) {
            member.roles.remove(tempRole);
            member.roles.add(member.guild.roles.cache.find(r => r.name === "Futurist"));
            message.lineReply(`${emojis.AI_Tick} **Verification successful**`);
        }
        else {
            if (!member.roles.cache.find(r => r.name === "Futurist")) {
                message.lineReply(`${emojis.AI_Cross} **Failed to verify due to expiration!** Please re-join this server (https://futureblur.com/dsc) and try again within 20 minutes.`)
            }
            else {
                message.lineReply(`${emojis.AI_Cross} You have already accepted the terms of service.`);
            }
        }
    }
}