const wordcut = require("wordcut");
const levenshtein = require("levenshtein-edit-distance");
const database = require("./database");
const ResponseJoke = require("./response-joke");
const InitialJoke = require("./initial-joke");

wordcut.init();
let allFlowTwoKeys = [];
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
  } else if (getAllkeysInMessage(msg).length > 0) {
    //Flow 2
    keys = getAllkeysInMessage(msg);
    if (preKey != null && keys.includes(preKey)) {
      const joke = new ResponseJoke(["คนสุดท้ายที่อยู่ในเกม"], ["คนสุดท้าย"]);
      preKey = null;
      return joke;
    }
    for (let e in keys) {
      let keyGetByValue = Object.keys(keyFlowTwos).find((key) => keyFlowTwos[key] === keys[e]);
      if (keys.includes(keyFlowTwos[keys[e]])) {
        const joke = new ResponseJoke(["คนสุดท้ายที่อยู่ในเกม"], ["คนสุดท้าย"]);
        preKey = null;
        return joke;
      } else if (keys.includes(keyGetByValue)) {
        const joke = new ResponseJoke(["คนสุดท้ายที่อยู่ในเกม"], ["คนสุดท้าย"]);
        preKey = null;
        return joke;
      }
      if (keyFlowTwos[keys[e]] === 0) {
        const joke = new ResponseJoke(["หมายถึงชอบเรา"], ["ชอบ"]);
        return joke;
      }
      if (keyFlowTwos[keys[e]] || keyGetByValue) {
        if (keyGetByValue) {
          preKey = keyGetByValue;
        } else {
          preKey = keyFlowTwos[keys[e]];
        }
      }
    }
  } else {
    // TODO: Flow 1
    const words = wordcut.cut(msg).split("|");
    if (words.length === 0) {
      return;
    }
    const keyword = words.sort((a, b) => b.length - a.length)[0];
    if (keyword.length < 2) {
      return;
    }
    const nearestWords = getNearestWords(keyword, 16);
    if (nearestWords.length === 0) {
      return;
    }
    const jokeWord = nearestWords[Math.floor(Math.random() * nearestWords.length)];
    console.log(keyword + " -> " + jokeWord);
    return new ResponseJoke(database.getWordDescriptions(jokeWord), [jokeWord]);
  }
}

function setFlowKey() {
  let keyFlowTwo = "คนสุดท้าย+เกม,แข่ง+กีฬา,ชอบ,ไอ+จาม";
  let keys = keyFlowTwo.split(",");
  allFlowTwoKeys = keyFlowTwo.split(/[\s,+]+/);
  for (let e in keys) {
    let arr = keys[e].split("+");
    keyFlowTwos[arr[0]] = arr[1] == null ? 0 : arr[1];
  }
}

function getAllkeysInMessage(msg) {
  let getAllkeysInMessage = [];
  for (let e in allFlowTwoKeys) {
    if (msg.includes(allFlowTwoKeys[e])) {
      getAllkeysInMessage.push(allFlowTwoKeys[e]);
    }
  }
  return getAllkeysInMessage;
}

function getNearestWords(word, maxSimilarityScore) {
  const words = database.getAllWords();
  let minSimilarityScore = maxSimilarityScore;
  let nearestWords = [];
  for (const w of words) {
    if (w === word) {
      continue;
    }
    const similarityScore = getSimilarityScore(w, word);
    if (similarityScore < minSimilarityScore) {
      minSimilarityScore = similarityScore;
      nearestWords = [w];
    } else if (similarityScore === minSimilarityScore) {
      nearestWords.push(w);
    }
  }
  return nearestWords;
}

function getSimilarityScore(word1, word2) {
  const editDistance = levenshtein(word1, word2);
  const editDistanceSimilarity = Math.pow(
    2,
    1 + editDistance / Math.min(word1.length, word2.length)
  );
  const vowelSimilarity = Math.pow(4, levenshtein(getVowels(word1), getVowels(word2))) / 2;
  const lengthSimilarity = Math.pow(
    4,
    word1.length > word2.length ? word1.length / word2.length : word2.length / word1.length
  );
  return editDistanceSimilarity + vowelSimilarity + lengthSimilarity;
}

/**
 * @param {string} word
 * @returns {string} string of vowels
 */
function getVowels(word) {
  return word.replace(/[ก-ฮ]/g, "").replace("ั", "ะ");
}

module.exports = createJoke;
