import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  fetchCountries,
  countriesListMarkup,
  countryCardMarkup,
} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('[id="search-box"]'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  let searchValue = refs.input.value.trim();

  if (searchValue === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchValue)
    .then(countries => {
      if (countries.length === 1) {
        const markup = countries
          .map(country => {
            return countriesListMarkup(country);
          })
          .join('');
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = markup;
        return;
      } else if (countries.length > 1 && countries.length <= 10) {
        const markup = countries
          .map(country => {
            return countryCardMarkup(country);
          })
          .join('');
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = markup;
        return;
      } else if (countries.length > 10) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(() => {
      return Notify.failure('Oops, there is no country with that name');
    });
}
