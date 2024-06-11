document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById("countries-container");
  const searchInput = document.getElementById("search");
  const regionFilter = document.getElementById("region-filter");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  const countriesData = [
    {
      name: "Germany",
      population: 81770900,
      region: "Europe",
      capital: "Berlin",
      flag: "https://flagcdn.com/w320/de.png",
      details: {
        nativeName: "Deutschland",
        subRegion: "Western Europe",
        topLevelDomain: ".de",
        currencies: "Euro",
        languages: ["German"],
        borderCountries: ["France", "Belgium", "Netherlands"],
      },
    },
    {
      name: "United States of America",
      population: 323947000,
      region: "Americas",
      capital: "Washington, D.C.",
      flag: "https://flagcdn.com/w320/us.png",
      details: {
        nativeName: "United States",
        subRegion: "Northern America",
        topLevelDomain: ".us",
        currencies: "United States dollar",
        languages: ["English"],
        borderCountries: ["Canada", "Mexico"],
      },
    },
    {
      name: "Brazil",
      population: 206135893,
      region: "Americas",
      capital: "Brasilia",
      flag: "https://flagcdn.com/w320/br.png",
      details: {
        nativeName: "Brasil",
        subRegion: "South America",
        topLevelDomain: ".br",
        currencies: "Brazilian real",
        languages: ["Portuguese"],
        borderCountries: ["Argentina", "Bolivia", "Colombia"],
      },
    },
    {
      name: "Iceland",
      population: 334300,
      region: "Europe",
      capital: "Reykjavik",
      flag: "https://flagcdn.com/w320/is.png",
      details: {
        nativeName: "Ísland",
        subRegion: "Northern Europe",
        topLevelDomain: ".is",
        currencies: "Icelandic króna",
        languages: ["Icelandic"],
        borderCountries: [],
      },
    },
    {
      name: "Afghanistan",
      population: 27657145,
      region: "Asia",
      capital: "Kabul",
      flag: "https://flagcdn.com/w320/af.png",
      details: {
        nativeName: "افغانستان",
        subRegion: "Southern Asia",
        topLevelDomain: ".af",
        currencies: "Afghan afghani",
        languages: ["Pashto", "Dari"],
        borderCountries: ["Tajikistan", "Turkmenistan", "Uzbekistan"],
      },
    },
    {
      name: "Åland Islands",
      population: 28875,
      region: "Europe",
      capital: "Mariehamn",
      flag: "https://flagcdn.com/w320/ax.png",
      details: {
        nativeName: "Åland",
        subRegion: "Northern Europe",
        topLevelDomain: ".ax",
        currencies: "Euro",
        languages: ["Swedish"],
        borderCountries: [],
      },
    },
    {
      name: "Albania",
      population: 2886026,
      region: "Europe",
      capital: "Tirana",
      flag: "https://flagcdn.com/w320/al.png",
      details: {
        nativeName: "Shqipëria",
        subRegion: "Southern Europe",
        topLevelDomain: ".al",
        currencies: "Albanian lek",
        languages: ["Albanian"],
        borderCountries: ["Montenegro", "Kosovo", "North Macedonia"],
      },
    },
    {
      name: "Algeria",
      population: 40400000,
      region: "Africa",
      capital: "Algiers",
      flag: "https://flagcdn.com/w320/dz.png",
      details: {
        nativeName: "الجزائر",
        subRegion: "Northern Africa",
        topLevelDomain: ".dz",
        currencies: "Algerian dinar",
        languages: ["Arabic"],
        borderCountries: ["Tunisia", "Libya", "Niger"],
      },
    },
  ];

  const displayCountries = (countries) => {
    countriesContainer.innerHTML = "";
    countries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.className = "country-card";
      countryCard.innerHTML = `
          <img src="${country.flag}" alt="${country.name} flag">
          <div class="country-info">
            <h2>${country.name}</h2>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
          </div>
        `;
      countryCard.addEventListener("click", () => showCountryDetails(country));
      countriesContainer.appendChild(countryCard);
    });
  };

  const showCountryDetails = (country) => {
    window.location.hash = `country/${country.name}`;
    const main = document.querySelector("main");
    main.innerHTML = `
        <div class="container">
          <button class="back" style="display: flex; align-items: center; gap: 10px; padding: 10px 32px; margin-bottom: 80px; border: none; background-color: inherit; font-size: 16px; font-weight: 300; color: #111517; cursor:pointer" onclick="window.location.hash = 'index.html'"><img src="../images/back.svg" alt="back"> Back</button>
          <div style="display:flex; align-items: flex-start; gap: 120px" class="country-detail">
            <img style="max-width: 560px; width: 100%" src="${
              country.flag
            }" alt="${country.name} flag">
            <div class="country-info">
              <h2>${country.name}</h2>
              <div style="display: flex; gap: 117px" class="part">
                <div style="margin-bottom: 68px" class="part1">
                  <p><strong>Native Name:</strong> ${
                    country.details.nativeName
                  }</p>
                  <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                  <p><strong>Region:</strong> ${country.region}</p>
                  <p><strong>Sub Region:</strong> ${
                    country.details.subRegion
                  }</p>
                  <p><strong>Capital:</strong> ${country.capital}</p>
                </div>
                <div class="part2">
                  <p><strong>Top Level Domain:</strong> ${
                    country.details.topLevelDomain
                  }</p>
                  <p><strong>Currencies:</strong> ${
                    country.details.currencies
                  }</p>
                  <p><strong>Languages:</strong> ${country.details.languages.join(
                    ", "
                  )}</p>
                </div>
              </div>
              <p><strong>Border Countries:</strong> ${country.details.borderCountries.join(
                " ,  "
              )}</p>
            </div>
          </div>
        </div>
      `;
    const backBtn = main.querySelector(".back-btn");
    backBtn.addEventListener("click", () => {
      window.history.back();
    });
    addDarkModeListener();
  };

  const filterCountries = () => {
    const searchValue = searchInput.value.toLowerCase();
    const regionValue = regionFilter.value;

    const filteredCountries = countriesData.filter((country) => {
      const countryName = country.name.toLowerCase();
      const countryRegion = country.region;
      return (
        countryName.includes(searchValue) &&
        (regionValue === "all" || countryRegion === regionValue)
      );
    });

    displayCountries(filteredCountries);
  };

  const addDarkModeListener = () => {
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
    });
  };

  window.addEventListener("hashchange", () => {
    const main = document.querySelector("main");
    if (!window.location.hash || window.location.hash === "#") {
      main.innerHTML = `
          <div class="container" id="countries-container"></div>
        `;
      displayCountries(countriesData);
      addDarkModeListener();
    }
  });

  searchInput.addEventListener("input", filterCountries);
  regionFilter.addEventListener("change", filterCountries);

  displayCountries(countriesData);
  addDarkModeListener();
});
