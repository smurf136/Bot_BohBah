const database = require("./database");
const { addNormalJoke } = require('./getJoke');
const { help } = require('./help');

/**
 * Add a new joke
 * @param {string} msg
 */


function addJoke(msg) {
  if (msg.includes("normalJoke")) {
    return addNormal(msg)
  } else if (msg.includes("dialogJoke")) {
    return addDialogJoke(msg)
  } else {
    return "key";
  }
}

function addDialogJoke(msg) {
  const newMessage = msg.replace('-a dialogJoke ', '');
  let dialogJoke = [];
  let string = newMessage.split(" ");
  for (let i = 0; i < string.length; i++) {
    dialogJoke.push(string[i]);
  }
  if (dialogJoke.length < 2 || string.includes('help')) {
    return help(msg);
  }
  let key = dialogJoke.shift();
  let a = database.addFlowTwo(key, ...dialogJoke);
  console.log(database.getFlowTwoAllKeys())
  // console.log(dialogJoke);
  return 'Succeed';
}

function addNormal(msg) {
  let splitString = msg.split(" ");
  let answer = splitString[2];
  let description = splitString[3];
  let word = splitString[4];
  if(!(answer||description||word)){
    return "plese enter answer, description, word";
  }
  addNormalJoke(answer, description, word);
  return "add Success";
}

function help(msg) {
  if (msg.includes('-adj')) {
    return 'Use: -adj [answer] [keyword] [..keyword] to create new joke.';
  }
  return 'You just type something wrong, try again.'
}
module.exports = { addJoke };