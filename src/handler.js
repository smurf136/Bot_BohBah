const { Message } = require("discord.js");

/**
 * Handle Discord message
 * @param {Message} msg
 */
function handleMessage(msg) {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
}

module.exports = { handleMessage };
