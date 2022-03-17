import { platformsUrl } from './config.js';
let form = document.querySelector('#add-platform-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let submitButton = form.querySelector('[type=submit]');
  submitButton.disabled = true;
  let platformFormData = new FormData(form);
  let platform = {};
  for (let [key, value] of platformFormData.entries()) {
    platform[key] = value;
  }
  
  fetch(platformsUrl, {
    method: 'POST',
    body: JSON.stringify(platform),
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
      console.log(`Added Platform with id ${results.id}`);
      let notifyElement = document.querySelector('#notifications');
      let message = document.createElement('p');
      message.classList.add('notification-fade');
      message.textContent = `Added Platform with id ${results.id}`;
      notifyElement.replaceChildren(message);
      setTimeout(() => message.classList.add('hidden'), 500);
      submitButton.disabled = false;
    });
});

export {};