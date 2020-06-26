class FlowTwoResponse {
    stage = 0;
    description = null;
    keyword = [];
  
    /**
     * @param {string} description
     * @param {string[]} keyword 
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
          console.log(this.description)
        return this.description;
      } else {
        for(let e in this.keyword){
          if (msg.includes(this.keyword[e])) {
            return 'แฮร่!';
          }
        }
          return 'เง้อออ';
      }
    }
  
    /**
     * @returns {boolean}
     */
    isEnded() {
      return this.stage >= 2;
    }
  }
  
  module.exports = FlowTwoResponse;
  