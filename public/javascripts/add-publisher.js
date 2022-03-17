import { publisherUrls } from './config.js';
let form = document.querySelector('#add-publisher-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let submitButton = form.querySelector('[type=submit]');
  submitButton.disabled = true;
  let publisherFormData = new FormData(form);
  let publisher = {};
  for (let [key, value] of publisherFormData.entries()) {
    publisher[key] = value;
  }
  console.log(publisher)
  fetch(publisherUrls, {
    method: 'POST',
    body: JSON.stringify(publisher),
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
      console.log(`Added publisher with id ${results.id}`);
      let notifyElement = document.querySelector('#notifications');
      let message = document.createElement('p');
      message.classList.add('notification-fade');
      message.textContent = `Added publisher with id ${results.id}`;
      notifyElement.replaceChildren(message);
      setTimeout(() => message.classList.add('hidden'), 500);
      submitButton.disabled = false;
    });
});

export {};