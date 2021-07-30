const channels = require("../config/channels.json");
const roles = require("../config/roles.json");

async function execute(oldMember, newMember) {
    const channelId = newMember.channelID;

    if (!newMember.channel || !newMember.member) {
        const role = newMember.guild.roles.cache.find(r => r.id === roles.VC);
        await newMember.member.roles.remove(role);
        return;
    }

    if (channelId === channels.GeneralVC || channelId === channels.MusicVC) {
        const role = newMember.guild.roles.cache.find(r => r.id === roles.VC);
        if (!newMember.member.roles.cache.has(role)) {
            await newMember.member.roles.add(role);
        }
    } else {
        const role = newMember.guild.roles.cache.find(r => r.id === roles.VC);
        await newMember.member.roles.remove(role);
    }
}

exports.execute = execute;