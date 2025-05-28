const dropdown = document.getElementById('countryDropdown');
const passportBox = document.getElementById('passportBox');
const polioBox = document.getElementById('polioBox');
const idBox = document.getElementById('idBox');
const passportTitle = document.getElementById('passportTitle');
const passportImage = document.getElementById('passportImage');
const passportCities = document.getElementById('passportCities');

const passportData = {
  Arstotzka: {
    title: 'Arstotzka Passport',
    photo: 'Photos/PassportArstotzka.png',
    cities: ['Orvech Vonor', 'East Grestin', 'Paradizna']
  },
  Kolechia: {
    title: 'Kolechia Passport',
    photo: 'Photos/PassportKolechia.png',
    cities: ['Vedor', 'West Grestin', 'Yurko City']
  },
  Antegria: {
    title: 'Antegria Passport',
    photo: 'Photos/PassportAntegria.png',
    cities: ['St. Marmero', 'Glorian', 'Outer Grouse']
  },
  Impor: {
    title: 'Impor Passport',
    photo: 'Photos/PassportImpor.png',
    cities: ['Enkyo', 'Haihan', 'Tsunkeido']
  },
  Republia: {
    title: 'Republia Passport',
    photo: 'Photos/PassportRepublia.png',
    cities: ['True Glorian', 'Lesrenadi', 'Bostan']
  },
  Obristan: {
    title: 'Obristan Passport',
    photo: 'Photos/PassportObristan.png',
    cities: ['Skal', 'Lorndaz', 'Mergerous']
  },
  "United Federation": {
    title: 'United Federation Passport',
    photo: 'Photos/PassportUnitedFederation.png',
    cities: ['Great Rapid', 'Shingleton', 'Korista City']
  }
};

function updatePassportBox(country) {
  if (passportData[country]) {
    passportBox.classList.remove('hidden');
    passportTitle.textContent = passportData[country].title;
    passportImage.src = passportData[country].photo;
    passportCities.innerHTML = '';
    passportData[country].cities.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city;
      passportCities.appendChild(li);
    });
  } else {
    passportBox.classList.add('hidden');
  }
}

function updatePolioBox(country) {
  if (country && country !== 'Country') {
    polioBox.classList.remove('hidden');
    setupPolioInfoboxChecklist();
  } else {
    polioBox.classList.add('hidden');
  }
}

function updateIdBox(country) {
  if (country === 'Arstotzka') {
    idBox.classList.remove('hidden');
    setupIdInfoboxChecklist();
  } else {
    idBox.classList.add('hidden');
  }
}

dropdown.addEventListener('change', () => {
  const country = dropdown.value;
  updatePassportBox(country);
  updatePolioBox(country);
  updateIdBox(country);
});

document.addEventListener('DOMContentLoaded', () => {
  passportBox.classList.add('hidden');
  polioBox.classList.add('hidden');
  idBox.classList.add('hidden');
});