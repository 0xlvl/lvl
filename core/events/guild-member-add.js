const profileModel = require("../models/profile-schema.js");
const config = require("../config/config.json");
const channels = require("../config/channels.json");
const welcome = require("../config/welcome.json");

async function execute(member, client) {
    //let profile = await profileModel.create({
    //    userID: member.id,
    //    serverID: member.guild.id,
    //    totalXP: 0,
    //    currentXP: 0,
    //    level: 1,
    //    lastMessage: 0,
    //    totalMessages: 0
    //});
    //
    //profile.save();

    const guild = member.guild;
    const memberCount = guild.memberCount;
    client.channels.fetch(channels["INFO.exe"])
        .then(category => category.setName(`INFO.exe・${memberCount.toLocaleString()} MEMBERS`));

    client.channels.fetch(channels.chat)
        .then(channel => {
            if (!member.user.bot) {
                channel.send(stringTemplateParser(welcome.list[welcome.list.length * Math.random() | 0], { member: member.user }));
            }
            else {
                channel.send(`We have got some bot support! Welcome, ${member.user} :tada:`);
            }
        });

    if (member.user.bot) return;

    client.channels.fetch(channels.verify)
        .then(channel => {
            channel.send(`${member} this server uses a one-time verification system. To continue, please type \`ai verify\`.`)
        });

    member.roles.add(guild.roles.cache.find(r => r.name === "."));
    setTimeout(() => {
        const role = member.roles.cache.find(r => r.name === ".");
        if (role) {
            member.roles.remove(role);
        }
    }, 20 * 60000);
}

function stringTemplateParser(expression, valueObj) {
    const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    let text = expression.replace(templateMatcher, (substring, value, index) => {
        value = valueObj[value];
        return value;
    });
    return text;
}

exports.execute = execute;