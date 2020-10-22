const { Message } = require("discord.js");
const { createJoke } = require("./create-joke");
const { addJoke } = require("./add-joke");

let currentJokes = {};

const addJokeKey = /^-a (normalJoke|dialogJoke|keyJoke)$/;

/**
 * Handle Discord message
 * @param {Message} msg
 */
async function handleMessage(msg) {
  if(isAddJoke(msg)){
    console.log("pass")
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
  console.log(msg.content.split(" ").slice(0,2).toString())
    return addJokeKey.test(msg.content.split(" ").slice(0,2).toString().replace(',',' '))
          &&msg.content.split(" ").length==5;
}

module.exports = { handleMessage };
