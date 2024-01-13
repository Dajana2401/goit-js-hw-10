import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
let searchBox = document.getElementById('search-box');
let selectCountries = document.getElementById('select-countries');
function renderCountries(countries) {
  if (countries.length > 10) {
    selectCountries.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 1) {
    const markup = countries
      .map(country => {
        return `<div style='border: 1px solid black;'><img style='width: 50px;padding: 5px;' src='${country.flags.svg}'></img><span>${country.name.common}</span></div>`;
      })
      .join('');
    selectCountries.innerHTML = markup;
  } else {
    const country = countries[0];
    selectCountries.innerHTML = `<img style='width: 50px;padding: 5px;' src='${
      country.flags.svg
    }'></img><span>${country.name.common}</span>
    <div><b>Capital:</b>${country.capital.join(', ')}</div>
    <div><b>Population:</b>${country.population}</div>
    <div><b>Languages:</b>${Object.values(country.languages).join(', ')}</div>`;
  }
}

let f = debounce(function () {
  if (searchBox.value.length > 0) {
    fetchCountries(searchBox.value.trim())
      .then(names => renderCountries(names))
      .catch(error => {
        selectCountries.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  } else {
    selectCountries.innerHTML = '';
  }
}, 300);
searchBox.addEventListener('input', function () {
  f();
});
