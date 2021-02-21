require('dotenv').config()
// const {loadAllWords} = require("./loadWords")
const {readAll} = require("./readWords")

// reads in an array of words
async function checkWords(words) {
    readAll(words)
}
checkWords()
