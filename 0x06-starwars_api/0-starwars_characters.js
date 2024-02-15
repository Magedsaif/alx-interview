#!/usr/bin/node

const request = require("request");

const movieId = process.argv[2];

if (!movieId) {
  console.error("Please provide a movie ID as an argument.");
  process.exit(1);
}

const url = `https://swapi.dev/api/films/${movieId}`;

request(url, (error, response, body) => {
  if (error) {
    console.error("Error fetching movie data:", error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error("Error:", response.statusCode);
    process.exit(1);
  }

  const movie = JSON.parse(body);

  movie.characters.forEach((characterUrl) => {
    request(characterUrl, (error, response, body) => {
      if (error) {
        console.error("Error fetching character data:", error);
        process.exit(1);
      }

      if (response.statusCode !== 200) {
        console.error("Error:", response.statusCode);
        process.exit(1);
      }

      const character = JSON.parse(body);
      console.log(character.name);
    });
  });
});
