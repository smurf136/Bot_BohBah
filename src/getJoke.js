let { fb } = require("./firebase");

const db = fb.database().ref("/");

function addNormalJoke(answer,description,word) {
  // Add a new document in collection "cities"
  db.push({
    answer : answer,
    description: description,
    word: word
  })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

function getAllJoke() {
  return new Promise(function (resolve, reject) {
    try {
      let ref = db;

      ref.on("value", function (snap) {
        if (typeof snap.val() === "undefined") {
          resolve(null);
        } else {
          resolve(snap.val());
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function randomJoke() {
  let jokeList = await getAllJoke()
    .then(function (snap) {
      return snap;
    })
    .catch(function (error) {
      console.error(error);
    });
  return jokeList[randomNum(jokeList.length)];
}

function randomNum(val) {
  return Math.floor(Math.random() * val);
}

async function run() {
  // let hi = await getAllJoke()
  //   .then(function (snap) {
  //     return snap
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  let hi = await randomJoke();
  console.log(hi);
}

if (require.main === module) {
  run();
}

module.exports = { getAllJoke, randomJoke, randomNum, addNormalJoke };
