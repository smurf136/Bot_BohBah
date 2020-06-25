const config = require("./config");
const { startDiscord } = require("./discord");
const { handleMessage } = require("./handler");

startDiscord(config.discordToken, handleMessage);
