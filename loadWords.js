require("dotenv").config();
const axios = require("axios");
const fs = require("file-system");

// this function loads in all the insensitive words as objects in words.json
async function loadAllWords() {
  let text = await fs.readFileSync("./biased-words.txt", "utf-8");
  let words = await text.split("\n");

  let allWords = {};
  for (let i = 0; i < words.length; i++) {
    allWords[words[i]] = await getSynonyms(words[i]);
  }
  allWords = JSON.stringify(allWords);
  fs.writeFile("./words.json", allWords, (err) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}
loadAllWords();

// this function reads in a word and returns a list of synonyms for that word
async function getSynonyms(word) {
  let results = await findSynonyms(word); // returns list of synonyms
  let synonyms = [];
  for (let key in results) {
    synonyms.push(results[key]);
  }
  return synonyms;
}

// this function finds the synonyms to a word (use this in initial population of json)
async function findSynonyms(word) {
  try {
    const response = await axios({
      method: "GET",
      url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": process.env.RAPID_API_HOST,
      },
    });
    let synonyms = response.data.synonyms;
    return synonyms;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  loadAllWords,
};
