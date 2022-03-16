import { restServer } from './config.js';
let form = document.querySelector('#add-game-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let submitButton = form.querySelector('[type=submit]');
  submitButton.disabled = true;
  let gameFormData = new FormData(form);
  let game = {};
  for (let [key, value] of gameFormData.entries()) {
    game[key] = value;
  }

  fetch(restServer, {
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
      console.log(`Added game with id ${results.id}`);
      let notifyElement = document.querySelector('#notifications');
      let message = document.createElement('p');
      message.classList.add('notification-fade');
      message.textContent = `Added game with id ${results.id}`;
      notifyElement.replaceChildren(message);
      setTimeout(() => message.classList.add('hidden'), 500);
      submitButton.disabled = false;
    });
});

export {};
