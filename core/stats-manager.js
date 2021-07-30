const roles = require('./config/roles.json');
const channels = require("./config/channels.json");
const emojis = require("./config/emojis.json");

async function levelUp(message, lvl) {
    let role = "";
    let unlocked = false;

    if (lvl >= 100) {
        const result = addRank(roles.HOLOGRAM, "HOLOGRAM 🔮", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 77) {
        const result = addRank(roles.ShadowDevice, "Shadow Device 👤", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 60) {
        const result = addRank(roles.NASA_PC, "NASA PC 🌌", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 50) {
        const result = addRank(roles.RTX_ON, "RTX ON 🌳", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 40) {
        const result = addRank(roles.RTX_OFF, "RTX OFF ❌", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 30) {
        const result = addRank(roles.RGB_PC, "RGB PC 🌈", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 25) {
        const result = addRank(roles.AestheticPC, "Aesthetic PC 🌸", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 19) {
        const result = addRank(roles.GamingPC, "Gaming PC 🎮", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 13) {
        const result = addRank(roles.Desktop, "Desktop 🖥️", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 8) {
        const result = addRank(roles.Laptop, "Laptop 💻", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 4) {
        const result = addRank(roles.Toaster, "Toaster 🍞", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    } else if (lvl >= 2) {
        const result = addRank(roles.PotatoPC, "Potato PC 🥔", message);
        unlocked = result.isUnlocked;
        role = result.roleName;
    }

    const unlockedText = unlocked === true ? `and you've also unlocked this new role: **${role}** Have fun!` : "";
    const cmd = await message.client.channels.fetch(channels.commandLine);
    cmd.send(`Ayy ${message.author}, you just level up! ${emojis.AI_LvlUp} You are now **LVL ${lvl}** ✨ ${unlockedText}`);
}

function addRank(id, name, message) {
    let role = "";
    const check = message.member.roles.cache.find(r => r.id === id);
    if (!check) {
        role = `\`${name}\``;

        const rankRole = message.guild.roles.cache.find(r => r.id === id);
        message.member.roles.add(rankRole);

        return {
            isUnlocked: true,
            roleName: role
        };
    } else {
        return {isUnlocked: false, roleName: ""};
    }
}

exports.levelUp = levelUp;