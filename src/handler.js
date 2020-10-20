const { Message } = require("discord.js");
const { createJoke } = require("./create-joke");
const { addJoke } = require("./add-joke");

let currentJokes = {};

/**
 * Handle Discord message
 * @param {Message} msg
 */
async function handleMessage(msg) {
  if(isAddJoke(msg)){
    let replyMessage = addJoke(msg.content);
    msg.reply(replyMessage);
  } else{
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

}

function isAddJoke(msg){
    return msg.content.includes('-');
}

module.exports = { handleMessage };
