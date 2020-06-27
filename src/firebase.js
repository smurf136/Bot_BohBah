let firebase = require("firebase");

let firebaseConfig = {
  apiKey: "AIzaSyDlHErRWFW4c44evIpP97ZNHKUM2S5MeAA",
  authDomain: "bot-bohbah.firebaseapp.com",
  databaseURL: "https://bot-bohbah.firebaseio.com",
  projectId: "bot-bohbah",
  storageBucket: "bot-bohbah.appspot.com",
  messagingSenderId: "474991597697",
  appId: "1:474991597697:web:497e517c269b8298079580",
  measurementId: "G-BEV88WX08L"
};

let fb = firebase.initializeApp(firebaseConfig);

module.exports = { fb };
