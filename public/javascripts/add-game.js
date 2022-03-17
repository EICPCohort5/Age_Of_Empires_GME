import { gamesUrl, genresUrl, publisherUrls, platformsUrl} from './config.js';
let form = document.querySelector('#add-game-form');

let publisherResponse = await fetch(publisherUrls);
let publishers = await publisherResponse.json();
let publisherOptions = publishers.map((publisher) => {
  let option = document.createElement('option');
  option.setAttribute('value', publisher.id);
  option.textContent = publisher.publisherName;
  return option;
});
let selectPublisherList = document.querySelector('#publisher-dropdown');
selectPublisherList.replaceChildren(...publisherOptions);
selectPublisherList.disabled = false;

let genreResponse = await fetch(genresUrl);
let genres = await genreResponse.json();
let genreOptions = genres.map((genre) => {
  let option = document.createElement('option');
  option.setAttribute('value', genre.id);
  option.textContent = genre.genreName;
  return option;
});
let selectGenreList = document.querySelector('#genre-dropdown');
selectGenreList.replaceChildren(...genreOptions);
selectGenreList.disabled = false;

let platformResponse = await fetch(platformsUrl);
let platforms = await platformResponse.json();
let platformOptions = platforms.map((platform) => {
  let option = document.createElement('option');
  option.setAttribute('value', platform.id);
  option.textContent = platform.platformName;
  return option;
});
let selectPlatformsList = document.querySelector('#platforms-dropdown');
selectPlatformsList.replaceChildren(...platformOptions);
selectPlatformsList.disabled = false;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let submitButton = form.querySelector('[type=submit]');
  submitButton.disabled = true;
  let gameFormData = new FormData(form);
  let game = {};
  game['Platforms'] = []
  for (let [key, value] of gameFormData.entries()) {
    if(key === 'Platforms') {
        game[key].push(value)
    } else {
        game[key] = value;
    }
  }
  console.log(game) 

  fetch(gamesUrl, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('Bad response? ', response);
      }
    })
    .then((results) => {
      console.log(`Added Game with id ${results.id}`);
      let notifyElement = document.querySelector('#notifications');
      let message = document.createElement('p');
      message.classList.add('notification-fade');
      message.textContent = `Added Game with id ${results.id}`;
      notifyElement.replaceChildren(message);
      setTimeout(() => message.classList.add('hidden'), 500);
      submitButton.disabled = false;
    });
});

export {};