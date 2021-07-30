const Discord = require("discord.js");
const config = require("./config/config.json");
const colors = require("./config/colors.json");
const random = require("random");

const reactions =
    [
        "How cute",
        "Aww",
        "Lovely",
        "Woow!",
        ":)",
        "❤️",
        ":3",
        "We love you",
        "lemme heart this",
        "Such a nice human being",
        "wow <3"
    ]

module.exports =
{
    execute(reaction, channel) {
        const react = reactions[random.int(0, reactions.length)];

        const embed = new Discord.MessageEmbed()
            .setColor(colors.ai)
            .setTitle("#")
            .setURL(reaction.message.url)
            .setAuthor(`by ${reaction.message.author.username} in ${reaction.message.channel.name}`, reaction.message.author.displayAvatarURL())
            .setDescription(reaction.message)
            .setTimestamp()
            .setFooter(react);

        channel.send(embed);
    }
}