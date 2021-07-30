const emojis = require("../config/emojis.json")
const channels = require("../config/channels.json");
const roles = require("../config/roles.json");
const welcome = require("../config/welcome.json");

module.exports = {
    name: "accept",
    description: "Accept the TOS to gain access to the server.",
    execute(message, args) {
        const member = message.member;
        const tempRole = member.roles.cache.find(r => r.name === ".");
        if (tempRole && !member.roles.cache.find(r => r.name === "Futurist")) {
            member.roles.remove(tempRole);
            member.roles.add(member.guild.roles.cache.find(r => r.name === "Futurist"));
            message.lineReply(`${emojis.AI_Tick} **Verification successful**`);

            const chat = member.guild.channels.cache.get(channels.chat);
            chat.send(stringTemplateParser(welcome.list[welcome.list.length * Math.random() | 0], {member: member.user}));

            setTimeout(() => {
                chat.send(`${member.user} feel free to get some <#${channels.roles}> :)`);
            }, 1700);
        } else {
            if (!member.roles.cache.find(r => r.name === "Futurist")) {
                message.lineReply(`${emojis.AI_Cross} **Failed to verify due to expiration!** Please re-join this server (https://futureblur.com/dsc) and try again within 20 minutes.`)
            } else {
                message.lineReply(`${emojis.AI_Cross} You have already accepted the terms of service.`);
            }
        }
    }
}

function stringTemplateParser(expression, valueObj) {
    const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    return expression.replace(templateMatcher, (substring, value, index) => {
        value = valueObj[value];
        return value;
    });
}

