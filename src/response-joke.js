class ResponseJoke {
  stage = 0;
  description = '';
  keyword = '';

  /**
   * @param {string} description
   * @param {string} keyword 
   */
  constructor(description, keyword) {
    this.description = description;
    this.keyword = keyword;
  }

  /**
   * @param {string} msg 
   * @returns {string} next response
   */
  next(msg) {
    this.stage++;
    if (this.stage === 1) {
      return 'ที่มัน' + this.description + 'อะนะ';
    } else {
      if (msg.includes(this.keyword)) {
        return 'แฮร่!';
      } else {
        return 'เง้อออ';
      }
    }
  }

  /**
   * @returns {boolean}
   */
  isEnded() {
    return this.stage >= 2;
  }
}

module.exports = ResponseJoke;
