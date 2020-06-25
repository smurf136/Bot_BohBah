const Discord = require('discord.js');
const Message = Discord.Message;

/**
 * Start a Discord bot
 * @param {string} token
 * @param {(msg: Message)=>string} handler 
 */
function startDiscord(token, handler) {
  const client = new Discord.Client();

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("message", handler);

  client.login(token);
}

module.exports = { startDiscord };
