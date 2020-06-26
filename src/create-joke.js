const ResponseJoke = require("./response-joke");
const InitialJoke = require("./initial-joke");
let allFlowTwoKeys = []
let keyFlowTwos = {};
let preKey = null;

/**
 * Create a joke
 * @param {string} msg
 */
function createJoke(msg) {
  setFlowKey();
  if (msg.includes("ขอมุก") || msg.includes("ขอมุข")) {
    // TODO: Flow 3
    return new InitialJoke();
  }
  else if (getAllkeysInMessage(msg) != []) {
    //Flow 2
    keys = getAllkeysInMessage(msg)
    if (preKey != null && keys.includes(preKey)) {
      const joke = new ResponseJoke("คนสุดท้ายที่อยู่ในเกม", "คนสุดท้าย");
      preKey = null;
      return joke;
    }
    for (let e in keys) {
      let keyGetByValue = Object.keys(keyFlowTwos).find(key => keyFlowTwos[key] === keys[e]);
      if (keys.includes(keyFlowTwos[keys[e]])) {
        const joke = new ResponseJoke("คนสุดท้ายที่อยู่ในเกม", "คนสุดท้าย");
        preKey = null;
        return joke;
      } else if (keys.includes(keyGetByValue)) {
        const joke = new ResponseJoke("คนสุดท้ายที่อยู่ในเกม", "คนสุดท้าย");
        preKey = null;
        return joke;
      }
      if (keyFlowTwos[keys[e]] === 0) {
        const joke = new ResponseJoke("หมายถึงชอบเรา", "ชอบ");
        return joke;
      } 
      if (keyFlowTwos[keys[e]] || keyGetByValue) {
          if (keyGetByValue) {
            preKey = keyGetByValue
          } else {
            preKey = keyFlowTwos[keys[e]];
          }
      }
    }
  } else {
    // TODO: Flow 1
    if (msg.includes("ละมุด")) {
      const joke = new ResponseJoke("สีม่วงๆ,กลมๆ", "มังคุด,มังกุ๊ด,บ่ะกุ๊ด");
      return joke;
    } else if (msg.includes('ซีเรียส')) {
      const joke = new ResponseJoke('เอาไว้กินตอนเช้า', 'ซีเรียล');
      return joke;
    }
  }
}

function setFlowKey() {
  let keyFlowTwo = "คนสุดท้าย+เกม,แข่ง+กีฬา,ชอบ,ไอ+จาม"
  let keys = keyFlowTwo.split(',')
  allFlowTwoKeys = keyFlowTwo.split(/[\s,+]+/)
  for (let e in keys) {
    let arr = keys[e].split('+')
    keyFlowTwos[arr[0]] = arr[1] == null ? 0 : arr[1]
  }
}

function getAllkeysInMessage(msg) {
  let getAllkeysInMessage = [];
  for (let e in allFlowTwoKeys) {
    if (msg.includes(allFlowTwoKeys[e])) {
      getAllkeysInMessage.push(allFlowTwoKeys[e])
    }
  }
  return getAllkeysInMessage;
}

module.exports = createJoke;
