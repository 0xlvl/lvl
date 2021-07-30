const Discord = require("discord.js");
const colors = require("../config/colors.json");
const profile = require("../models/profile-schema.js");
const channels = require("../config/channels.json");

module.exports = {
    name: "level",
    description: "Display your current level.",
    async execute(message, args, profileData) {
        return;
        const cmd = await message.client.channels.fetch(channels.commandLine);

        if (message.channel.id !== channels.commandLine) {
            await cmd.send("<@" + message.author + "> use my commands here :)")
            await message.delete();
        }

        const neededXP = 5 * Math.pow(profileData.level, 2) + (50 * profileData.level);
        const percentage = Math.floor(profileData.currentXP / neededXP * 100);
        let rank = 0;
        const results = await profile.find({}).sort({level: -1});

        for (const result of results) {
            rank++;
            if (result.userID === message.author.id) {
                break;
            }
        }

        const embed = new Discord.MessageEmbed()
            .setColor(colors.ai)
            .setAuthor(`${message.author.username}'s Stats`, message.author.displayAvatarURL())
            .addFields(
                {name: "Rank", value: `\`#${rank}\``},
                {name: "Level", value: `\`${profileData.level}\``, inline: true},
                {name: "XP", value: `\`${profileData.totalXP}\``, inline: true},
                {name: "Messages", value: `\`${profileData.totalMessages}\``, inline: true},
                {name: "Progress", value: `\`${profileData.currentXP}/${neededXP} (${percentage}%)\``}
            )
            .setTimestamp()


        cmd.send(embed);
    }
}