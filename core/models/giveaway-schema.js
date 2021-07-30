const mongoose = require("mongoose");

const giveawaySchema = new mongoose.Schema({
    ID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    messageID: { type: String, require: true }
});

const model = mongoose.model("Giveaway", giveawaySchema);

module.exports = model;