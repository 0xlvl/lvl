const blacklisted = require("./config/blacklisted.json");
const config = require("./config/config.json");

function filter(message) {
    const msg = message.content.toLowerCase();

    if (message.author.id != config.ownerID) {
        for (const link of blacklisted.links) {
            if (msg.includes(link)) {
                message.delete();
                message.channel.send(`${message.author} do not post invite links.`)
                    .then(temp => {
                        setTimeout(() => {
                            temp.delete();
                        }, 3000);
                    })

                return true;
            }
        }
    }

    for (const word of blacklisted.words) {
        const msgArray = msg.split(/(\s+)/).filter(function (e) { return e.trim().length > 0; });

        for (const item of msgArray) {
            if (item == word) {
                message.delete();
                message.channel.send(`${message.author} watch your language.`)
                    .then(temp => {
                        setTimeout(() => temp.delete(), 3000);
                    })

                return true;
            }
        }
    }

    return false;
}

module.exports = { filter }