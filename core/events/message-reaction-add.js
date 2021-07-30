const cuteKarma = require("../cute-karma");

const config = require("../config/config.json");
const channels = require("../config/channels.json");

async function execute(reaction, user, client) {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error("Failed to fetch reaction: ", error);
            return;
        }
    }

    if (reaction.message.channel.id !== channels.aww) {
        if (reaction.emoji.name === "❤️") {
            if (reaction.count >= config.heartCount) {
                client.channels.fetch(channels.aww)
                    .then(channel => {
                        cuteKarma.execute(reaction, channel);
                    });
            }
        }
    }
}

exports.execute = execute;