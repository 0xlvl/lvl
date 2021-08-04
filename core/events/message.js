const random = require("random");

const profileModel = require("../models/profile-schema");
const config = require("../config/config.json");
const emojis = require("../config/emojis.json");

const chatFilter = require("../chat-filter");
const statsManager = require("../stats-manager");

async function execute(message, client) {
    if (message.author.bot) return;

    let profileData;
    //try {
    //    profileData = await profileModel.findOne({ userID: message.author.id });
    //    if (!profileData) {
    //        let profile = await profileModel.create({
    //            userID: message.author.id,
    //            serverID: message.guild.id,
    //            totalXP: 0,
    //            currentXP: 0,
    //            level: 1,
    //            lastMessage: 0,
    //            totalMessages: 0
    //        });
    //
    //        profile.save();
    //        profileData = profile;
    //    }
    //} catch (error) {
    //    console.error(error);
    //}

    if (chatFilter.filter(message)) return;

    if (message.content.toLowerCase() === "-_-" || message.content.toLowerCase() === "😑") {
        if (Math.random() < 0.5) {
            message.channel.send(emojis.Wither);
        } else {
            message.channel.send(emojis.Wother);
        }

    }

    //profileData.totalMessages++;

    // if (Date.now() - profileData.lastMessage >= 60000 || true) {
    //     const xp = random.int(15, 25);
    //     let currentXP = profileData.currentXP + xp;
    //     let lvl = profileData.level;
    //     const xpToLevelUp = 5 * Math.pow(lvl, 2) + (50 * lvl);
    //     const lastMessage = Date.now();

    //     profileData.currentXP += xp;
    //     profileData.totalXP += xp;
    //     //console.log("XP: " + xp);

    //     //LEVEL UP
    //     if (currentXP >= xpToLevelUp) {
    //         lvl++;
    //         profileData.level++;
    //         profileData.currentXP -= xpToLevelUp;
    //         currentXP -= xpToLevelUp;
    //         statsManager.levelUp(message, lvl);
    //     }

    //     const response = await profileModel.findOneAndUpdate(
    //         {
    //             userID: message.author.id
    //         },
    //         {
    //             $inc: {
    //                 totalXP: xp,
    //                 totalMessages: 1,
    //             },
    //             $set: {
    //                 currentXP: currentXP,
    //                 level: lvl,
    //                 lastMessage: lastMessage
    //             },
    //         }
    //     );
    // }
    // else {
    //     const response = await profileModel.findOneAndUpdate(
    //         {
    //             userID: message.author.id
    //         },
    //         {
    //             $inc: {
    //                 totalMessages: 1,
    //             },
    //         }
    //     );
    // }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandItem = args.shift().toLowerCase();
    if (!client.commands.has(commandItem)) return;

    const command = client.commands.get(commandItem);
    try {
        command.execute(message, args, profileData);
    } catch (error) {
        console.log(error);
    }
}

exports.execute = execute;