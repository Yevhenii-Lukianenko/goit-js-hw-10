export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function countriesListMarkup({
  name,
  capital,
  population,
  flags,
  languages,
}) {
  const languagesList = Object.values(languages).join(', ');
  return `<div class='country-info__title'>
              <img src="${flags.svg}" alt="flag">
              <h2>${name.official}</h2>
          </div>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>languages</b>: ${languagesList}</p>
          `;
}

export function countryCardMarkup({ name, flags }) {
  return `<li class='country-list__item'>
                    <img src="${flags.svg}" alt="flag">
                    <p>${name.official}</p>
                    </li>`;
}
