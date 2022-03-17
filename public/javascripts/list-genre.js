import { genresUrl } from './config.js';

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

function renderTable(genres) {
  let tableBody = document.querySelector('#genres-container tbody');
  let rows = [];
  for (let genre of genres) {
    let row = document.createElement('tr');
    row.insertAdjacentHTML(
      `beforeend`,
      `
    <td>${genre.genreName}</td>
    `
    );
    rows.push(row);
  }
  tableBody.append(...rows);
}

fetchData(genresUrl);