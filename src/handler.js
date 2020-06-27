const { Message } = require("discord.js");
const { createJoke } = require("./create-joke");

let currentJokes = {};

/**
 * Handle Discord message
 * @param {Message} msg
 */
async function handleMessage(msg) {
  if (!currentJokes[msg.author.id]) {
    currentJokes[msg.author.id] = await createJoke(msg.content);
  }
  if (currentJokes[msg.author.id]) {
    const joke = currentJokes[msg.author.id];
    msg.reply(joke.next(msg.content));
    if (joke.isEnded()) {
      delete currentJokes[msg.author.id];
    }
  }
}

module.exports = { handleMessage };
