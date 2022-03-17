import { genresUrl } from './config.js';
let form = document.querySelector('#add-genre-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let submitButton = form.querySelector('[type=submit]');
  submitButton.disabled = true;
  let genreFormData = new FormData(form);
  let genre = {};
  for (let [key, value] of genreFormData.entries()) {
    genre[key] = value;
  }
  
  fetch(genresUrl, {
    method: 'POST',
    body: JSON.stringify(genre),
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
      console.log(`Added Genre with id ${results.id}`);
      let notifyElement = document.querySelector('#notifications');
      let message = document.createElement('p');
      message.classList.add('notification-fade');
      message.textContent = `Added Genre with id ${results.id}`;
      notifyElement.replaceChildren(message);
      setTimeout(() => message.classList.add('hidden'), 500);
      submitButton.disabled = false;
    });
});

export {};
