const wordcut = require("wordcut");
const levenshtein = require("levenshtein-edit-distance");
const database = require("./database");
const SimilarWordJoke = require("./similar-word-joke");
const FlowTwoResponse = require("./flow2-response");
const InitialJoke = require("./initial-joke");
const { randomJoke } = require("./getJoke");

wordcut.init();
let allFlowTwoKeys = [];
let keyFlowTwos = {};
let preKey = [];

/**
 * Create a joke
 * @param {string} msg
 */
async function createJoke(msg) {
  setFlowKey();
  if (msg.includes("ขอมุก") || msg.includes("ขอมุข")) {
    //Flow 3 : Give some joke
    return flowThree()
  } else if (getAllkeysInMessage(msg).length > 0) {
    //Flow 2 : Dialog joke
    return FlowTwo(msg);
  } else {
    // Flow 1: Similar Word Joke
    return flowOne(msg);
  }
}

function flowOne(msg){
  const words = wordcut.cut(msg).split("|");
    if (words.length === 0) {
      return;
    }
    const keyword = words.sort((a, b) => b.length - a.length)[0];
    if (keyword.length < 2) {
      return;
    }
    const nearestWords = getNearestWords(keyword, 20);
    if (nearestWords.length === 0) {
      return;
    }
    const jokeWord = nearestWords[Math.floor(Math.random() * nearestWords.length)];
    console.log(keyword + " -> " + jokeWord);
    return new SimilarWordJoke(database.getWordDescriptions(jokeWord), [jokeWord]);
}

function FlowTwo(msg){
  keys = getAllkeysInMessage(msg);
    if (preKey.length > 0) {
      for (let e in preKey) {
        if (keys.includes(preKey[e])) {
          console.log(keyFlowTwos[preKey])
          if (keyFlowTwos[preKey] != null) {
            answer = database.getFlowTwoAnswer(preKey);
          } else {
            let key = Object.keys(keyFlowTwos);
            keyGetByValue = null;
            for (let e in key) {
              console.log(key[e])
              if (keyFlowTwos[key[e]] == (preKey)) {
                keyGetByValue = keyFlowTwos[key[e]]
              }
            }
            answer = database.getFlowTwoAnswer(keyGetByValue);
          }
          description = database.getFlowTwoDescription(answer)
          const joke = new FlowTwoResponse(answer, description);
          preKey = [];
          console.log(answer)
          console.log(description)
          return joke;
        }
      }
    }
    for (let e in keys) {
      let keyGetByValue = getKeyByValue(keys[e]);
      if (keys.includes(keyFlowTwos[keys[e]])) {
        answer = database.getFlowTwoAnswer([keys[e]]);
        description = database.getFlowTwoDescription(answer)
        const joke = new FlowTwoResponse(answer, description);
        preKey = [];
        return joke;
      } else if (keys.includes(keyGetByValue[0])) {
        answer = database.getFlowTwoAnswer([keys[e]]);
        description = database.getFlowTwoDescription(answer)
        const joke = new FlowTwoResponse(answer, description);
        preKey = [];
        return joke;
      }
      if (keyFlowTwos[keys[e]] === 0) {
        answer = database.getFlowTwoAnswer(keys[e]);
        description = database.getFlowTwoDescription(answer)
        const joke = new FlowTwoResponse(answer, description);
        return joke;
      }
      if (keyFlowTwos[keys[e]] || keyGetByValue.length > 0) {
        if (keyGetByValue.length > 0) {
          preKey = keyGetByValue;
        } else {
          preKey = [keyFlowTwos[keys[e]]];
        }
      }
    }
}

async function flowThree() {
  let joke = await randomJoke();
  console.log(joke);
  let keyword = wordcut.cut(joke.description).split("|");
  return new InitialJoke(joke.word, keyword, joke.answer);
}

function getKeyByValue(value) {
  let arr = []
  let keyFlowTwosAfterFindKey = keyFlowTwos
  while (Object.keys(keyFlowTwosAfterFindKey).find((key) => keyFlowTwosAfterFindKey[key] === value)) {
    console.log("inloop")
    result = Object.keys(keyFlowTwosAfterFindKey).find((key) => keyFlowTwosAfterFindKey[key] === value)
    arr.push(result);
    keyFlowTwosAfterFindKey[result] = null;
  }
  console.log("key get by val" + arr)
  return arr;
}

function setFlowKey() {
  allFlowTwoKeys = database.getFlowTwoAllKeys().allKeys;
  keyFlowTwos = database.getFlowTwoAllKeys().keys;
}

function getAllkeysInMessage(msg) {
  let getAllkeysInMessage = [];
  for (let e in allFlowTwoKeys) {
    if (msg.includes(allFlowTwoKeys[e]) && !getAllkeysInMessage.includes(msg)) {
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
    4,
    1 + editDistance / Math.min(word1.length, word2.length)
  );
  const vowelSimilarity = Math.pow(4, levenshtein(getVowels(word1), getVowels(word2)));
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
  return word.replace(/[ก-หฮ]/g, "").replace("ั", "ะ");
}

module.exports = { createJoke };
