const dropdown = document.getElementById('countryDropdown');
const checklistDocuments = document.getElementById('checklist-documents');
const checklistReasons = document.getElementById('checklist-reasons');

// Static checklist items
const baseItems = ['Passport', 'Polio Vaccine', 'Wanted Photos']

const reasonMap = {
  Asylum: ['Grant of Asylum'],
  Work: ['Work Pass'],
  Diplomat: ['Authorization', 'Fingerprints'],
  'Transit/Visiting': []
};

let selectedReason = null;

function updateChecklistDocuments(country, reason) {
  checklistDocuments.innerHTML = '';

  const items = [...baseItems];

  if (country && country !== 'Country') {
    if (country === 'Arstotzka') {
      items.push('ID');
    } else {
      items.push('Access Permit');
    }
  }

  if (reason && reasonMap[reason]) {
    items.push(...reasonMap[reason]);
  }

  items.forEach(item => addCheckbox(item, checklistDocuments));
}

function updateChecklistReasons() {
  checklistReasons.innerHTML = '';

  Object.keys(reasonMap).forEach(reason => {
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-wrapper-47';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const id = 'reason-' + reason.toLowerCase().replace(/\s+/g, '-');
    checkbox.id = id;
    checkbox.name = 'entryReason';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = reason;

    checkbox.addEventListener('change', () => {
      document.querySelectorAll('input[name="entryReason"]').forEach(cb => {
        if (cb !== checkbox) cb.checked = false;
      });

      selectedReason = checkbox.checked ? reason : null;
      updateChecklistDocuments(dropdown.value, selectedReason);
    });

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    checklistReasons.appendChild(wrapper);
  });
}

function addCheckbox(labelText, parent) {
  const wrapper = document.createElement('div');
  wrapper.className = 'checkbox-wrapper-47';

  const id = 'cb-' + labelText.replace(/\s+/g, '-').toLowerCase();

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = labelText;

  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  parent.appendChild(wrapper);
}

// Passport visuals and data
const passportData = {
  Arstotzka: {
    title: 'Arstotzkan Passport',
    photo: 'https://static.wikia.nocookie.net/papersplease/images/2/2d/PassportOuterArstotzka.png/revision/latest?cb=20130624094123',
    cities: ['Orvech Vonor', 'East Grestin', 'Paradizna']
  },
  Kolechia: {
    title: 'Kolechian Passport',
    photo: 'kolechian-passport.png',
    cities: ['Vedor', 'West Grestin', 'Yurko City']
  },
  // Add other countries similarly
};

// Initial population
updateChecklistReasons();
updateChecklistDocuments(dropdown.value, selectedReason);

// Country dropdown logic
dropdown.addEventListener('change', () => {
  updateChecklistDocuments(dropdown.value, selectedReason);

  const country = dropdown.value;
  const passportBox = document.getElementById('passportBox');
  const passportTitle = document.getElementById('passportTitle');
  const passportImage = document.getElementById('passportImage');
  const passportCities = document.getElementById('passportCities');

  if (passportData[country]) {
    passportBox.style.display = 'block';
    passportTitle.textContent = passportData[country].title;
    passportImage.src = passportData[country].photo;

    passportCities.innerHTML = '';
    passportData[country].cities.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city;
      passportCities.appendChild(li);
    });
  } else {
    passportBox.style.display = 'none';
  }
});

// Logic to hide box when all checkboxes are ticked
document.addEventListener('DOMContentLoaded', () => {
  const passportCheckbox = document.getElementById('passportCheckbox');
  const passportBox = document.getElementById('passportBox');

  const checkboxes = [
    'name',
    'dob',
    'sex',
    'city',
    'exp',
    'face'
  ].map(id => document.getElementById(id));

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const allChecked = checkboxes.every(c => c.checked);
      if (allChecked) {
        passportCheckbox.checked = true;
        passportBox.style.display = 'none';
      }
    });
  });
});
