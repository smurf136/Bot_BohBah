const database = require("./database");
const { addNormalJoke } = require('./getJoke');

/**
 * Add a new joke
 * @param {string} msg
 */

const addJokeFormat = /^-a normalJoke [a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+/;

function addJoke(msg) {
  if(addJokeFormat.test(msg)){
    console.log(msg)
    return addNormal(msg)
  }
  return addDialogJoke(msg);
}

function addDialogJoke(msg){ 
  if(msg.includes('-adj')){
    const newMessage = msg.replace('-adj ','');
    let dialogJoke = [];
    let string = newMessage.split(" ");
    for(let i = 0 ; i < string.length ; i++){
      dialogJoke.push(string[i]);
    }
    if(dialogJoke.length < 2 || string.includes('help')){
      return help(msg);
    }
    let key = dialogJoke.shift();
    let a = database.addFlowTwo(key,...dialogJoke);
    console.log(database.getFlowTwoAllKeys())
    // console.log(dialogJoke);
    return 'Succeed';
  }
  return help(msg);
}

function addNormal(msg){
  let splitString = msg.split(" ");
    let answer = splitString[2];
    let description = splitString[3];
    let word = splitString[4];
    addNormalJoke(answer,description,word);
    return "add Success";
}

function help(msg){
  if(msg.includes('-adj')){
    return 'Use: -adj [answer] [keyword] [..keyword] to create new joke.';
  }
  return 'You just type something wrong, try again.'
}
module.exports = { addJoke };