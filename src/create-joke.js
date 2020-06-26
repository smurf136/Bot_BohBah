const ResponseJoke = require("./response-joke");
const InitialJoke = require("./initial-joke");

/**
 * Create a joke
 * @param {string} msg
 */
function createJoke(msg) {
  if (msg.includes("ขอมุก") || msg.includes("ขอมุข")) {
    // TODO: Flow 3
    return new InitialJoke();
  } else {
    // TODO: Flow 1, 2
    if (msg.includes("ละมุด")) {
      const joke = new ResponseJoke("สีม่วงๆ", "มังคุด");
      return joke;
    } else if (msg.includes('ซีเรียส')) {
      const joke = new ResponseJoke('เอาไว้กินตอนเช้า', 'ซีเรียล');
      return joke;
    }
  }
}

module.exports = createJoke;
