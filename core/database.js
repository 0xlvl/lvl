const mongoose = require("mongoose");

function connect() {
    mongoose.connect(process.env.MONGODB_SRV,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then(() => {
            console.log("Connected to DB.");
        }).catch((err) => {
            console.error(err);
        });
}

exports.connect = connect;