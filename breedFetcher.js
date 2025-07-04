const needle = require('needle');
console.log("needle loaded successfully!");

// Function to grab the breed name from command line arguments
function getBreedName() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Please provide a breed name as an argument.");
    process.exit(1);
  }
  return args[0];
}

// Call getBreedName to retrieve the breed name
const breedName = getBreedName();

// API endpoint for fetching breed information
const API_URL = 'https://api.thecatapi.com/v1/breeds/search?q=${breedName}';

// Function to get url for failing
needle.get(API_URL, (error, response) => {
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }
  if (response.statusCode !== 200) {
    console.error("Failed to fetch data. Status code:", response.statusCode);
    return;
  }

  const breeds = response.body;
  if (breeds.length === 0) {
    console.log("No breeds found.");
    return;
  }});