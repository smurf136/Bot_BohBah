const {randomNum} = require("./getJoke")
const {failed_list} = require("./failed_list")
const {tob_joke_list} = require("./tob-joke")
class InitialJoke {
  stage = 0;
  keyword = [];
  answer = ''
  /**
   * 
   * @param {string} joke
   * @param {string[]} keyword 
   * @param {string} answer
   */

  constructor(joke, keyword, answer){
    this.keyword = keyword
    this.joke = joke
    this.answer = answer
  }

  /**
   * @param {string} msg 
   * @returns {string} next response
   */
  next(msg) {
    // TODO
    this.stage++;
    if (this.stage === 1) {
      return this.joke
    } else if(this.stage === 2){
      if(this.keyword === null) {
        return this.answer
      }
      console.log('keyword: ', this.keyword)
      for (let e in this.keyword) {
        if (msg.includes(this.keyword[e])) {
          console.log("correct")
          return this.answer;
        }
      }
      console.log("wrong")
      this.stage = 3
      return failed_list[randomNum(failed_list.length)];
    }else {
      return tob_joke_list[randomNum(tob_joke_list.length)]
    }
  }

  /**
   * @returns {boolean}
   */
  isEnded() {
    // TODO
    return this.stage >= 3;
  }
}

module.exports = InitialJoke;
