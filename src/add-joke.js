const database = require("./database");

/**
 * Add a new joke
 * @param {string} msg
 */

function addJoke(msg) {
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

function help(msg){
  if(msg.includes('-adj')){
    return 'Use: -adj [answer] [keyword] [..keyword] to create new joke.';
  }
  return 'You just type something wrong, try again.'
}
module.exports = { addJoke };