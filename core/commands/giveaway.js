const Discord = require("discord.js");
const emojis = require("../config/emojis.json");
const colors = require("../config/colors.json");
const channels = require("../config/channels.json");
const roles = require("../config/roles.json");

module.exports =
    {
        name: "giveaway",
        description: "Host a giveaway! <duration>, <winner count>, <gift>, <requirements (default: none)>",
        execute(message, args) {
            if (message.member.roles.cache.find(r => r.name === "Giveaway Host")) {
                if (!args[0]) {
                    message.lineReply(`${emojis.AI_Cross} You need to specify the duration of the giveaway! Examples: 1d (day), 1min(minute), 1w(week).`);
                    return;
                }

                if (args[0] === "roll") {
                    manualRoll(message, args);
                    return;
                }

                let winnerCount = 0;
                const winnerCountString = args[1].slice(0, args[1].length - 1);
                if (isNaN(winnerCountString)) {
                    message.lineReply(`${emojis.AI_Cross} You need to specify the winner count!`);
                    return;
                }

                winnerCount = winnerCountString;

                if (winnerCount === 0) {
                    message.lineReply(`${emojis.AI_Cross} You need to specify the winner count!`);
                    return;
                }

                const second = 1000;
                const minute = second * 60;
                const hour = minute * 60;
                const day = minute * 60;
                const week = day * 7;
                const month = day * 31;
                const year = day * 365;

                let duration = 0;
                const durationArray = args[0].split(/([0-9]+)/);
                let timeString = "";
                let enteredDuration = durationArray[1];
                if (isNaN(enteredDuration)) {
                    message.lineReply(`${emojis.AI_Cross} You need to specify the duration!`);
                    return;
                }

                let endingDate;

                switch (durationArray[2].slice(0, durationArray[2].length - 1)) {
                    case "s":
                        duration = durationArray[1] * second;
                        timeString = "second(s)";
                        break;
                    case "min":
                        duration = durationArray[1] * minute;
                        timeString = "minute(s)";
                        break;
                    case "h":
                        duration = durationArray[1] * hour;
                        timeString = "hour(s)";
                        break;
                    case "d":
                        duration = durationArray[1] * day;
                        timeString = "day(s)";
                        endingDate = new Date();
                        endingDate.setDate(endingDate.getDate() + enteredDuration * 1);
                        break;
                    case "w":
                        duration = durationArray[1] * week;
                        timeString = "week(s)";
                        endingDate = new Date();
                        endingDate.setDate(endingDate.getDate() + enteredDuration * 7);
                        break;
                    case "m":
                        duration = durationArray[1] * month;
                        timeString = "month(s)";
                        endingDate = new Date();
                        endingDate.setDate(endingDate.getDate() + enteredDuration * 31);
                        break;
                    case "y":
                        duration = durationArray[1] * year;
                        timeString = "year(s)";
                        endingDate = new Date();
                        endingDate.setDate(endingDate.getDate() + enteredDuration * 365);
                        break;
                }

                //Remove first two arguments
                args.shift();
                args.shift();

                let giftString = "";
                let giftWordCount = 0;
                for (const gift of args) {
                    giftWordCount++;
                    giftString += " " + gift;
                    if (gift.slice(-1) === ",") {
                        giftString = giftString.slice(0, giftString.length - 1);
                        break;
                    }
                }

                giftString = giftString.trim();

                for (let i = 0; i < giftWordCount; i++) {
                    args.shift();
                }

                let requirements = "";
                for (const req of args) {
                    requirements += " " + req;
                }

                if (requirements === "") requirements = "none";

                let readableDuration = `${enteredDuration} ${timeString}`;
                if (endingDate) {
                    readableDuration = `**${readableDuration}**`
                    readableDuration += "・" + endingDate;
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(colors.ai)
                    .setTitle(giftString)
                    .setAuthor(`Hosted by ${message.author.username}`)
                    .setURL("https://futureblur.com")
                    .setDescription(`Requirements: ${requirements}\nWinners: ${winnerCount}\n**React with 🎁 to enter!**`)
                    .addFields({name: "Ends", value: readableDuration})
                    .setTimestamp();

                message.member.client.channels.fetch(channels.giveaways)
                    .then(channel => {
                        channel.send(`<@&${roles.Giveaway}>`, embed)
                            .then(msg => {
                                try {
                                    msg.react("🎁");
                                    startGiveaway(duration, msg, winnerCount);
                                } catch (err) {
                                    console.error(err);
                                }
                            });
                    });
                //message.lineReply(`Is this right? React with ${emojis.AI_Tick} or ${emojis.AI_Cross}`, embed);
            }
        },
    };

const delay = ms => new Promise(res => setTimeout(res, ms))

function startGiveaway(duration, message, winners) {
    return new Promise(async (resolve, reject) => {
        await delay(duration);
        await rollGiveaway(message, winners);
    });
}

async function rollGiveaway(message, winnerCount) {
    const reaction = message.reactions.cache.get("🎁");
    const users = await reaction.users.fetch();
    let winners = [];

    if (users.size === 1) {
        message.channel.send(`${emojis.AI_Cross} No participants, giveaway ended.`)
        return;
    }

    let embed = new Discord.MessageEmbed()
        .setColor(colors.ai)
        .setTitle("Giveaway Ended")
        .setURL("https://futureblur.com");

    let winnersString = "Winner(s):\n";

    if (users.size - 1 < winnerCount) {
        for (const user of users.values()) {
            winnersString += `${user}\n`;
        }

    } else {
        for (let i = 0; i < winnerCount; i++) {
            const winner = getRandomWinner(winners, users);
            winnersString += `${winner}\n`;
            winners.push(winner);
        }
    }

    embed.setDescription(winnersString);
    await message.channel.send(embed);
}

function getRandomWinner(winners, users) {
    const winner = users.random();
    if (winner.bot || winners.some(e => e === winner)) {
        return getRandomWinner(winners, users);
    } else {
        return winner;
    }
}

function manualRoll(message, args) {
    args.shift();

    if (!args[0]) {
        message.lineReply(`${emojis.AI_Cross} You have to specify the message id.`);
        return;
    }

    if (!args[1] || isNaN(args[1])) {
        message.lineReply(`${emojis.AI_Cross} You have to specify the winner count.`);
        return;
    }

    message.channel.messages.fetch(args[0])
        .then(msg => rollGiveaway(msg, args[1]))
        .catch(err => {
            console.log(err);
            message.channel.send(`${emojis.AI_Cross} Failed to fetch message.`)
        });
}