const wordBank = require("./words.json");

// this program reads in a list of words and replaces insensitive words with a the word object
async function readAll(words) {
  for (let i = 0; i < words.length; i++) {
    if (wordBank.hasOwnProperty(words[i])) {
      let word = words[i];
      words[i] = [word, wordBank[words[i]]];
    }
  }
  console.log(words);
  return words;
}

module.exports = {
  readAll,
};
