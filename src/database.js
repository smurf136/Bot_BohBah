// temporary database
const words = {
  'มังคุด': ['ม่วงๆ', 'กลมๆ'],
  'ซีเรียล': ['เอาไว้กินตอนเช้า'],
  'ซีเรียส': ['จริงจัง'],
  'ตะคริว': ['ทำให้รู้สึกเจ็บขา', 'เป็นก้อนๆ'],
  'กีตาร์': ['ดีดแล้วมีเสียง'],
  'ลอง': ['แปลว่ายาว'],
  'เครื่องบิน': ['อยู่บนท้องฟ้า'],
  'แมงมุม': ['มีแปดขา'],
  'แตงกวา': ['มีสีเขียว'],
  'รังแค': ['อยู่บนหัว'],
  'กาแฟ': ['เอาไว้กินแก้ง่วง'],
}

let flow2Words = {
  'คนสุดท้ายที่อยู่ในเกม?' : ['คนสุดท้าย','เกม'],
  'หมายถึงชอบเรา?' : ['ชอบ'],
  'ไอจามไม่มีไอจีดีกว่า' : ['ไอ','จาม'],
  'ชงมุขอะน่ะ' : ['ชง'],
  'หมายถึงหิวข้าว?' : ['หิว'], 
  'หมายถึงเล่นเกมแล้วเบื่อ': ['เบื่อ','เกม'],
	'เท่าเมื่อวาน'	:['กี่โมง'],
	'เวรยามหรอ' : ['เวร'],
	'หมายถึงมะม่วงอะนะ'	: ['กวน'],
	'หยังไม่ได้นอนเลยจะสิบโมงเช้า' : ['หยัง']	,
  'ไม่เศร้าน่ะเบเบ๊' : ['แง'],
	'ที่แปลว่าไม่หลวมอะนะ':['ค้าบ'],
  'ที่อยู่บนหัวอะนะ':['เหงา'],
  'ไปหาคนคุยสิ!!':['เหา'],
  'โอ๋ๆ ร้องไปเลยไม่ปลอบหรอก':['เศร้า'],
  'ไปร้านจิวเวอร์รี่สิ ไม่ให้หรอกแพง':['ขอมุก'],
}

function getFlowTwoAllKeys(){
  let data = {}
  let key = {}
  let all = []
  let allKeys = Object.keys(flow2Words)
  for(let e in allKeys){
    for(let i in flow2Words[allKeys[e]]){
      all.push(flow2Words[allKeys[e]][i])
    }
    key[flow2Words[allKeys[e]][0]] = flow2Words[allKeys[e]][1] == null ? 0 : flow2Words[allKeys[e]][1];
  }
  data = {
    allKeys : all,
    keys : key
  }
  return data;
}

function getFlowTwoAnswer(value){
  return Object.keys(flow2Words).find((key) => key.includes(value));
}

function getFlowTwoDescription(key){
  return flow2Words[key];
}

function addFlowTwo(key,...value){
  return flow2Words[key] = value;
}

function getAllWords() {
  return Object.keys(words);
}

function getWordDescriptions(word) {
  return words[word];
}

module.exports = { 
  getAllWords, 
  getWordDescriptions,
  getFlowTwoAllKeys,
  getFlowTwoAnswer,
  getFlowTwoDescription,
  addFlowTwo
};
