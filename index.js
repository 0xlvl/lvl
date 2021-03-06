const Discord = require("discord.js");

const database = require("./core/database.js");

const keepAlive = require("./server.js");

const messageEvent = require('./core/events/message.js');
const messageReactionAdd = require("./core/events/message-reaction-add.js");
const guildMemberAdd = require("./core/events/guild-member-add.js");
const guildMemberRemove = require("./core/events/guild-member-remove.js");
const voiceStateUpdate = require("./core/events/voice-state-update.js");

require("dotenv").config();
require('discord-reply');

const fs = require("fs");
const commandFiles = fs.readdirSync("./core/commands").filter(file => file.endsWith(".js"));

const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const cmd of commandFiles) {
    const command = require(`./core/commands/${cmd}`);
    client.commands.set(command.name, command);
}

client.on('message', async (message) => {
    await messageEvent.execute(message, client);
});

client.on("messageReactionAdd", async (reaction, user) => {
    await messageReactionAdd.execute(reaction, user, client);
});

client.on("guildMemberAdd", async (member) => {
    await guildMemberAdd.execute(member, client);
});

client.on("guildMemberRemove", async (member) => {
    await guildMemberRemove.execute(member, client);
});

client.on("voiceStateUpdate", async (oldMember, newMember) => {
    await voiceStateUpdate.execute(oldMember, newMember);
});

//database.connect();
keepAlive();
client.login(process.env.TOKEN).then(() => console.log("Logged in."));
