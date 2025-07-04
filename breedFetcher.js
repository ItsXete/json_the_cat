// breedFetcher.js
const needle = require('needle');

const fetchBreedDescription = function(breedName, callback) {
  const API_URL = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  needle.get(API_URL, (error, response) => {
    if (error) {
      callback(error, null); // error case
      return;
    }

    if (response.statusCode !== 200) {
      callback(`Status Code: ${response.statusCode}`, null); // non-200 status
      return;
    }

    const data = response.body;

    if (data.length === 0) {
      callback("Breed not found.", null); // breed not found
      return;
    }

    const breed = data[0];
    callback(null, breed.description); // success
  });
};

// Export the function
module.exports = { fetchBreedDescription };