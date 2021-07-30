const channels = require("../config/channels.json");

async function execute(member, client) {
    const guild = member.guild;
    const memberCount = guild.memberCount;
    client.channels.fetch(channels["INFO.exe"])
        .then(category => category.setName(`INFO.exe・${memberCount.toLocaleString()} MEMBERS`));
}

exports.execute = execute;