const mongoose = require("mongoose");
const connectDB = async () => {
    mongoose.connect("mongodb+srv://sanin:sanin%40123@cluster0.aovh7kl.mongodb.net/data");
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", () => console.log("Database Connected Successfully".bold.brightGreen));
};

module.exports = connectDB;
