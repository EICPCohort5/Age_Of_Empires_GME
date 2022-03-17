import { platformsUrl } from './config.js';

async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (response.ok) {
      let results = await response.json();
      renderTable(results);
    } else {
      console.log(`Could not find anything at ${url}`);
    }
  } catch (error) {
    console.error(`Couldn't fetch data because ${error}`);
  }
}

function renderTable(platforms) {
  let tableBody = document.querySelector('#platforms-container tbody');
  let rows = [];
  for (let platform of platforms) {
    let row = document.createElement('tr');
    row.insertAdjacentHTML(
      `beforeend`,
      `
    <td>${platform.id}</td>
    <td>${platform.platformName}</td>
    `
    );
    rows.push(row);
  }
  tableBody.append(...rows);
}

fetchData(platformsUrl);