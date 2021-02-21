require('dotenv').config()
// const {loadAllWords} = require("./loadWords")
const {readAll} = require("./readWords")

async function checkWords(words) {
    readAll(words)
}
checkWords()
