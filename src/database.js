// temporary database
const words = {
  'มังคุด': ['ม่วงๆ', 'กลมๆ'],
  'ซีเรียล': ['เอาไว้กินตอนเช้า'],
  'ชีเรียส': ['จริงจัง'],
  'ตะคริว': ['ทำให้รู้สึกเจ็บขา', 'เป็นก้อนๆ'],
  'กีตาร์': ['ดีดแล้วมีเสียง'],
  'ลอง': ['แปลว่ายาว'],
  'เครื่องบิน': ['อยู่บนท้องฟ้า'],
  'แมงมุม': ['มีแปดขา']
}

function getAllWords() {
  return Object.keys(words);
}

function getWordDescriptions(word) {
  return words[word];
}

module.exports = { getAllWords, getWordDescriptions };
