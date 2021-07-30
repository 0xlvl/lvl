const Discord = require("discord.js");
const profile = require("../models/profile-schema.js");
const colors = require("../config/colors.json");
const channels = require("../config/channels.json");

module.exports = {
    name: "leaderboard",
    description: "Shows the top 10 users with the highest level.",
    async execute(message, args, profileData) {
        return;
        const cmd = await message.client.channels.fetch(channels.commandLine);

        if (message.channel.id !== channels.commandLine) {
            await cmd.send("<@" + message.author + "> use my commands here :)")
            await message.delete();
        }

        let rank = 0;
        const results = await profile.find({}).sort({ level: -1 }).limit(10);

        const embed = new Discord.MessageEmbed()
            .setColor(colors.ai)
            .setTitle(`LEADERBOARD`);

        for (const result of results) {
            rank++;
            let rankEmoji = "";

            if (rank === 1) {
                rankEmoji = "🥇 ";
            }
            else if (rank === 2) {
                rankEmoji = "🥈 ";
            }
            else if (rank === 3) {
                rankEmoji = "🥉 ";
            }

            const user = await message.client.users.fetch(result.userID);
            embed.addField(`#${rank} ・ ${rankEmoji}${user.username}`, `**LVL:** \`${result.level}\` ・ **XP:** \`${result.totalXP}\``);
        }

        embed.setTimestamp();
        cmd.send(embed);
    }
}