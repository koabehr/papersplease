const dropdown = document.getElementById('countryDropdown');
const checklistDocuments = document.getElementById('checklist-documents');
const checklistReasons = document.getElementById('checklist-reasons');
const passportBox = document.getElementById('passportBox');
const passportTitle = document.getElementById('passportTitle');
const passportImage = document.getElementById('passportImage');
const passportCities = document.getElementById('passportCities');
const passportCheckbox = document.getElementById('passportCheckbox');

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
    title: 'Arstotzkan Passport',
    photo: 'https://static.wikia.nocookie.net/papersplease/images/2/2d/PassportOuterArstotzka.png/revision/latest?cb=20130624094123',
    cities: ['Orvech Vonor', 'East Grestin', 'Paradizna']
  },
  Kolechia: {
    title: 'Kolechian Passport',
    photo: 'kolechian-passport.png',
    cities: ['Vedor', 'West Grestin', 'Yurko City']
  }
  // Add other countries similarly
};

let selectedReason = null;

// Update checklist documents based on country and reason
function updateChecklistDocuments(country, reason) {
  checklistDocuments.innerHTML = '';
  const items = [...baseItems];

  if (country && country !== 'Country') {
    items.push(country === 'Arstotzka' ? 'ID' : 'Access Permit');
  }

  if (reason && reasonMap[reason]) {
    items.push(...reasonMap[reason]);
  }

  items.forEach(item => addCheckbox(item, checklistDocuments));
}

// Update checklist reasons
function updateChecklistReasons() {
  checklistReasons.innerHTML = '';

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
      passportBox.style.display = 'flex'; // Show the infobox
      passportTitle.textContent = passportData[country].title;
      passportImage.src = passportData[country].photo;
  
      passportCities.innerHTML = '';
      passportData[country].cities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        passportCities.appendChild(li);
      });
    } else {
      passportBox.style.display = 'none'; // Hide the infobox
    }
  }

// Auto-check passport and hide infobox
document.addEventListener('DOMContentLoaded', () => {
    const infoCheckboxIds = ['name', 'dob', 'sex', 'city', 'exp', 'face'];
    const infoCheckboxes = infoCheckboxIds.map(id => document.getElementById(id));
    const passportSidebarCheckbox = document.querySelector('#checklist-documents input[type="checkbox"][id="passportCheckbox"]');
  
    infoCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const allChecked = infoCheckboxes.every(c => c.checked);
  
        if (allChecked) {
          passportSidebarCheckbox.checked = true; // Mark the sidebar Passport checkbox
          passportBox.style.display = 'none'; // Hide the infobox
          infoCheckboxes.forEach(c => (c.checked = false)); // Reset infobox checkboxes
        }
      });
    });
  });

// Initialize checklist and dropdown logic
dropdown.addEventListener('change', () => {
    const country = dropdown.value;
  
    if (country === 'Country') {
      passportBox.style.display = 'none'; // Hide infobox if no valid country is selected
    } else {
      updatePassportBox(country); // Show infobox for valid country
    }
  
    updateChecklistDocuments(country, selectedReason);
  });