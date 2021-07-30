const channels = require("../config/channels.json");
const roles = require("../config/roles.json");

async function execute(oldMember, newMember) {
    const channelId = newMember.channelID;

    if (!newMember.channel || !newMember.member) {
        const role = newMember.guild.roles.cache.find(r => r.id === roles.VC);
        newMember.member.roles.remove(role);
        return;
    }

    if (channelId == channels.GeneralVC || channelId == channels.MusicVC) {
        const role = newMember.guild.roles.cache.find(r => r.id === roles.VC);
        if (!newMember.member.roles.cache.has(role)) {
            newMember.member.roles.add(role);
        }
    }
    else {
        const role = newMember.guild.roles.cache.find(r => r.id === roles.VC);
        newMember.member.roles.remove(role);
        return;
    }
}

exports.execute = execute;