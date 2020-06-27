const {failed_list} = require("./failed_list")
const {randomNum} = require("./getJoke")
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
    } else {
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
      return failed_list[randomNum(failed_list.length)];
    }
  }

  /**
   * @returns {boolean}
   */
  isEnded() {
    // TODO
    return this.stage >= 2;
  }
}

module.exports = InitialJoke;
