const dropdown = document.getElementById('countryDropdown');
const passportBox = document.getElementById('passportBox');
const polioBox = document.getElementById('polioBox');
const idBox = document.getElementById('idBox');
const accessPermitBox = document.getElementById('accessPermitBox');
const passportTitle = document.getElementById('passportTitle');
const passportImage = document.getElementById('passportImage');
const passportCities = document.getElementById('passportCities');
const checklistDocuments = document.getElementById('checklist-documents');
const checklistReasons = document.getElementById('checklist-reasons');

const baseItems = ['Passport', 'Polio Vaccine', 'Wanted Photos'];

const reasonMap = {
  Asylum: ['Grant of Asylum', 'Fingerprints'],
  Work: ['Work Pass'],
  Diplomat: ['Authorization'],
  'Transit/Visiting': [],
  Immigrate: []
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
  "United Federation": {
    title: 'United Federation Passport',
    photo: 'Photos/PassportUnitedFederation.png',
    cities: ['Great Rapid', 'Shingleton', 'Korista City']
  }
};

let selectedReason = null;

// --- Checklist rendering functions ---

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

  // Passport infobox hide/show logic
  const passportSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Passport"]');
  if (passportSidebarCheckbox) {
    passportSidebarCheckbox.addEventListener('change', () => {
      passportBox.classList.remove('complete');
      if (passportSidebarCheckbox.checked) {
        passportBox.classList.add('hidden');
      } else {
        if (dropdown.value && dropdown.value !== 'Country' && passportData[dropdown.value]) {
          passportBox.classList.remove('hidden');
        }
      }
    });
  }

  // Polio infobox hide/show logic
  const polioSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Polio Vaccine"]');
  if (polioSidebarCheckbox) {
    polioSidebarCheckbox.addEventListener('change', () => {
      polioBox.classList.remove('complete');
      if (polioSidebarCheckbox.checked) {
        polioBox.classList.add('hidden');
      } else {
        if (dropdown.value && dropdown.value !== 'Country') {
          polioBox.classList.remove('hidden');
        }
      }
    });
  }

  // ID infobox hide/show logic
  const idSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="ID"]');
  if (idSidebarCheckbox) {
    idSidebarCheckbox.addEventListener('change', () => {
      idBox.classList.remove('complete');
      if (idSidebarCheckbox.checked) {
        idBox.classList.add('hidden');
      } else {
        if (dropdown.value === 'Arstotzka') {
          idBox.classList.remove('hidden');
        }
      }
    });
  }

  // Access Permit infobox hide/show logic
  const apSidebarCheckbox = document.querySelector('#checklist-documents input[data-label="Access Permit"]');
  if (apSidebarCheckbox) {
    apSidebarCheckbox.addEventListener('change', () => {
      accessPermitBox.classList.remove('complete');
      if (apSidebarCheckbox.checked) {
        accessPermitBox.classList.add('hidden');
      } else {
        if (
          dropdown.value &&
          dropdown.value !== 'Country' &&
          dropdown.value !== 'Arstotzka'
        ) {
          accessPermitBox.classList.remove('hidden');
        }
      }
    });
  }
}

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

// --- Infobox logic ---

function setupInfoboxChecklistGeneric({
  box,
  checklistIds,
  sidebarSelector,
  shouldShow
}) {
  const checkboxes = checklistIds.map(id => document.getElementById(id));
  function onChecklistChange() {
    const allChecked = checkboxes.every(c => c.checked);
    const sidebarCheckbox = document.querySelector(sidebarSelector);
    if (allChecked) {
      box.classList.add('complete');
      setTimeout(() => {
        if (sidebarCheckbox) sidebarCheckbox.checked = true;
        box.classList.add('hidden');
        box.classList.remove('complete');
        checkboxes.forEach(c => (c.checked = false));
      }, 1000);
    }
  }
  checkboxes.forEach(cb => {
    cb.onchange = onChecklistChange;
  });

  // Sidebar checkbox logic
  const sidebarCheckbox = document.querySelector(sidebarSelector);
  if (sidebarCheckbox) {
    sidebarCheckbox.onchange = () => {
      box.classList.remove('complete');
      if (sidebarCheckbox.checked) {
        box.classList.add('hidden');
      } else if (shouldShow()) {
        box.classList.remove('hidden');
      }
    };
  }
}

// --- Infobox show/hide logic ---

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
    setupInfoboxChecklistGeneric({
      box: passportBox,
      checklistIds: ['name', 'passport-id', 'dob', 'sex', 'city', 'exp', 'face'],
      sidebarSelector: '#checklist-documents input[data-label="Passport"]',
      shouldShow: () => dropdown.value && dropdown.value !== 'Country' && passportData[dropdown.value]
    });
  } else {
    passportBox.classList.add('hidden');
  }
}

function updatePolioBox(country) {
  if (country && country !== 'Country') {
    polioBox.classList.remove('hidden');
    setupInfoboxChecklistGeneric({
      box: polioBox,
      checklistIds: ['polio-name', 'polio-id', 'polio-exp'],
      sidebarSelector: '#checklist-documents input[data-label="Polio Vaccine"]',
      shouldShow: () => dropdown.value && dropdown.value !== 'Country'
    });
  } else {
    polioBox.classList.add('hidden');
  }
}

function updateIdBox(country) {
  if (country === 'Arstotzka') {
    idBox.classList.remove('hidden');
    setupInfoboxChecklistGeneric({
      box: idBox,
      checklistIds: ['id-district', 'id-name', 'id-dob', 'id-height', 'id-weight'],
      sidebarSelector: '#checklist-documents input[data-label="ID"]',
      shouldShow: () => dropdown.value === 'Arstotzka'
    });
  } else {
    idBox.classList.add('hidden');
  }
}

function updateAccessPermitBox(country) {
  if (
    country &&
    country !== 'Country' &&
    country !== 'Arstotzka'
  ) {
    accessPermitBox.classList.remove('hidden');
    setupInfoboxChecklistGeneric({
      box: accessPermitBox,
      checklistIds: [
        'ap-seal',
        'ap-name',
        'ap-nationality',
        'ap-id',
        'ap-purpose',
        'ap-duration',
        'ap-height',
        'ap-weight',
        'ap-appearance',
        'ap-expiration'
      ],
      sidebarSelector: '#checklist-documents input[data-label="Access Permit"]',
      shouldShow: () =>
        dropdown.value &&
        dropdown.value !== 'Country' &&
        dropdown.value !== 'Arstotzka'
    });
  } else {
    accessPermitBox.classList.add('hidden');
  }
}

// --- Dropdown logic ---

dropdown.addEventListener('change', () => {
  const country = dropdown.value;
  updateChecklistDocuments(country, selectedReason);
  updateChecklistReasons(country);
  updatePassportBox(country);
  updatePolioBox(country);
  updateIdBox(country);
  updateAccessPermitBox(country);
});

// --- On load ---

document.addEventListener('DOMContentLoaded', () => {
  checklistDocuments.classList.add('hidden');
  checklistReasons.classList.add('hidden');
  passportBox.classList.add('hidden');
  polioBox.classList.add('hidden');
  idBox.classList.add('hidden');
  accessPermitBox.classList.add('hidden');
});

// Reset button logic
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
  // Reset dropdown
  dropdown.value = "Country";
  // Hide all infoboxes
  passportBox.classList.add('hidden');
  polioBox.classList.add('hidden');
  idBox.classList.add('hidden');
  accessPermitBox.classList.add('hidden');
  // Hide checklists
  checklistDocuments.classList.add('hidden');
  checklistReasons.classList.add('hidden');
  // Uncheck all checkboxes in sidebar and infoboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  // Remove green border if present
  document.querySelectorAll('.info-box').forEach(box => {
    box.classList.remove('complete');
  });
  // Reset selectedReason
  selectedReason = null;
});