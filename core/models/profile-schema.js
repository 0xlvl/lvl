const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    lastMessage: { type: Number, default: 0 },
    totalXP: { type: Number, default: 0 },
    currentXP: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    totalMessages: { type: Number, default: 0 }
});

const model = mongoose.model("Profile", profileSchema);

module.exports = model;