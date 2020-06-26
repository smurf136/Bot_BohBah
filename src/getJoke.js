let {fb} = require("./firebase.js");

const db = fb.database().ref("/");

function getJoke() {
  return new Promise(function (resolve, reject) {
    try {
      let ref = db

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

async function run() {
  //
  getJoke()
    .then(function (snap) {
      console.log(snap);
    })
    .catch(function (error) {
      console.log(error);
    });
}

run();

module.exports = { getJoke };
