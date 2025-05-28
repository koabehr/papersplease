const dropdown = document.getElementById('countryDropdown');
const checklistDocuments = document.getElementById('checklist-documents');
const checklistReasons = document.getElementById('checklist-reasons');
const passportBox = document.getElementById('passportBox');
const passportTitle = document.getElementById('passportTitle');
const passportImage = document.getElementById('passportImage');
const passportCities = document.getElementById('passportCities');
const polioBox = document.getElementById('polioBox');

// Static checklist items
const baseItems = ['Passport', 'Polio Vaccine', 'Wanted Photos'];

const reasonMap = {
  Asylum: ['Grant of Asylum'],
  Work: ['Work Pass'],
  Diplomat: ['Authorization', 'Fingerprints'],
  'Transit/Visiting': []
};

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
  UnitedFederation: {
    title: 'United Federation Passport',
    photo: 'Photos/PassportUnitedFederation.png',
    cities: ['Great Rapid', 'Shingleton', 'Korista City']
  }
  // Add other countries as needed
};

let selectedReason = null;

// Update checklist documents based on country and reason
function updateChecklistDocuments(country, reason) {
  checklistDocuments.innerHTML = '';
  if (!country || country === 'Country') {
    checklistDocuments.classList.add('hidden');
    return;
  }
  checklistDocuments.classList.remove('hidden');
  const items = [...baseItems];
  items.push(country === 'Arstotzka' ? 'ID' : 'Access Permit');
  if (reason && reasonMap[reason]) {
    items.push(...reasonMap[reason]);
  }
  items.forEach(item => addCheckbox(item, checklistDocuments));

  // Add event listener to Passport checkbox to hide/re-show infobox
  const passportSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Passport"]');
  if (passportSidebarCheckbox) {
    passportSidebarCheckbox.addEventListener('change', () => {
      if (passportSidebarCheckbox.checked) {
        passportBox.classList.add('hidden');
      } else {
        if (dropdown.value && dropdown.value !== 'Country' && passportData[dropdown.value]) {
          passportBox.classList.remove('hidden');
        }
      }
    });
  }

  // Add event listener to Polio Vaccine checkbox to hide/re-show polio infobox
  const polioSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Polio Vaccine"]');
  if (polioSidebarCheckbox) {
    polioSidebarCheckbox.addEventListener('change', () => {
      if (polioSidebarCheckbox.checked) {
        polioBox.classList.add('hidden');
      } else {
        if (dropdown.value && dropdown.value !== 'Country') {
          polioBox.classList.remove('hidden');
        }
      }
    });
  }
}

// Update checklist reasons
function updateChecklistReasons(country) {
  checklistReasons.innerHTML = '';
  if (!country || country === 'Country') {
    checklistReasons.classList.add('hidden');
    return;
  }
  checklistReasons.classList.remove('hidden');
  Object.keys(reasonMap).forEach(reason => {
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-wrapper-47';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `reason-${reason.toLowerCase().replace(/\s+/g, '-')}`;
    checkbox.name = 'entryReason';

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
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

// Add a checkbox to a parent element
function addCheckbox(labelText, parent) {
  const wrapper = document.createElement('div');
  wrapper.className = 'checkbox-wrapper-47';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `cb-${labelText.replace(/\s+/g, '-').toLowerCase()}`;
  checkbox.dataset.label = labelText;

  const label = document.createElement('label');
  label.setAttribute('for', checkbox.id);
  label.textContent = labelText;

  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  parent.appendChild(wrapper);
}

// Update passport visuals and data
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

// Infobox checklist logic for passport
function setupInfoboxChecklist() {
  const infoCheckboxIds = ['name', 'dob', 'sex', 'city', 'exp', 'face'];
  const infoCheckboxes = infoCheckboxIds.map(id => document.getElementById(id));
  infoCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const allChecked = infoCheckboxes.every(c => c.checked);
      if (allChecked) {
        const passportSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Passport"]');
        if (passportSidebarCheckbox) passportSidebarCheckbox.checked = true;
        passportBox.classList.add('hidden');
        infoCheckboxes.forEach(c => (c.checked = false));
      }
    });
  });

  // Also hide/re-show infobox if the passport checkbox is checked/deselected directly
  const passportSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Passport"]');
  if (passportSidebarCheckbox) {
    passportSidebarCheckbox.addEventListener('change', () => {
      if (passportSidebarCheckbox.checked) {
        passportBox.classList.add('hidden');
      } else {
        if (dropdown.value && dropdown.value !== 'Country' && passportData[dropdown.value]) {
          passportBox.classList.remove('hidden');
        }
      }
    });
  }
}

// Infobox checklist logic for polio
function setupPolioInfoboxChecklist() {
  const polioCheckboxIds = ['polio-name', 'polio-id', 'polio-exp'];
  const polioCheckboxes = polioCheckboxIds.map(id => document.getElementById(id));
  polioCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const allChecked = polioCheckboxes.every(c => c.checked);
      const polioSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Polio Vaccine"]');
      if (allChecked) {
        if (polioSidebarCheckbox) polioSidebarCheckbox.checked = true;
        polioBox.classList.add('hidden');
        polioCheckboxes.forEach(c => (c.checked = false));
      }
    });
  });

  // Also hide/re-show infobox if the polio vaccine checkbox is checked/deselected directly
  const polioSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Polio Vaccine"]');
  if (polioSidebarCheckbox) {
    polioSidebarCheckbox.addEventListener('change', () => {
      if (polioSidebarCheckbox.checked) {
        polioBox.classList.add('hidden');
      } else {
        if (dropdown.value && dropdown.value !== 'Country') {
          polioBox.classList.remove('hidden');
        }
      }
    });
  }
}

// Show/hide Polio Vaccine infobox based on country selection
function updatePolioBox(country) {
  if (country && country !== 'Country') {
    polioBox.classList.remove('hidden');
    setupPolioInfoboxChecklist();
  } else {
    polioBox.classList.add('hidden');
  }
}

// Dropdown change logic
dropdown.addEventListener('change', () => {
  const country = dropdown.value;
  updateChecklistDocuments(country, selectedReason);
  updateChecklistReasons(country);
  updatePolioBox(country);
  if (country === 'Country') {
    passportBox.classList.add('hidden');
    selectedReason = null;
  } else {
    updatePassportBox(country);
    setupInfoboxChecklist();
  }
});

// On load: show titles, hide checklists and infoboxes
document.addEventListener('DOMContentLoaded', () => {
  checklistDocuments.classList.add('hidden');
  checklistReasons.classList.add('hidden');
  passportBox.classList.add('hidden');
  polioBox.classList.add('hidden');
});