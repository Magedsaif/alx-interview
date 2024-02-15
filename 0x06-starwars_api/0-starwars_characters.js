const request = require("request");

const baseURL = "https://swapi-api.hbtn.io/api/films/";

request(baseURL + process.argv[2], (err, res, body) => {
  if (err) {
    console.error("Error fetching movie data:", err);
    process.exit(1);
  }

  if (res.statusCode !== 200) {
    console.error("Error:", res.statusCode);
    process.exit(1);
  }

  const filmData = JSON.parse(body);
  const characterUrls = filmData.characters;

  const characterRequests = characterUrls.map((url) => {
    return new Promise((resolve, reject) => {
      request(url, (error, response, characterBody) => {
        if (error) {
          reject(error);
          return;
        }

        if (response.statusCode !== 200) {
          reject(`Error fetching character ${url}: ${response.statusCode}`);
          return;
        }

        const character = JSON.parse(characterBody);
        resolve(character);
      });
    });
  });

  Promise.all(characterRequests)
    .then((characters) => {
      characters.forEach((character) => console.log(character.name));
    })
    .catch((error) => {
      console.error("Error fetching characters:", error);
    });
});
