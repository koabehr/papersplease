const dropdown = document.getElementById('countryDropdown');
const checklistDocuments = document.getElementById('checklist-documents');
const checklistReasons = document.getElementById('checklist-reasons');

// Base items for documents
const baseItems = ['Passport', 'Polio Vaccine'];

// Reasons and their linked documents
const reasonMap = {
  Asylum: ['Grant of Asylum'],
  Work: ['Work Pass'],
  Diplomat: ['Authorization', 'Fingerprints'],
  'Transit/Visiting': []
};

// State to keep selected reason
let selectedReason = null;

function updateChecklistDocuments(country, reason) {
  checklistDocuments.innerHTML = ''; // Clear current document list

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
  checklistReasons.innerHTML = ''; // Clear previous

  Object.keys(reasonMap).forEach(reason => {
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-wrapper-47';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const id = 'reason-' + reason.replace(/\s+/g, '-').toLowerCase();
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

// Initial setup
updateChecklistReasons();
updateChecklistDocuments(dropdown.value, selectedReason);

// Country change updates document checklist
dropdown.addEventListener('change', () => {
  updateChecklistDocuments(dropdown.value, selectedReason);
});

document.addEventListener('DOMContentLoaded', () => {
  const countryDropdown = document.getElementById('countryDropdown');
  const arstotzkaBox = document.getElementById('passport-ars');
  const passportCheckbox = document.getElementById('passportCheckboxArstotzka');

  const checkboxes = [
    'ars-name',
    'ars-dob',
    'ars-sex',
    'ars-issued',
    'ars-exp',
    'ars-face'
  ].map(id => document.getElementById(id));

  // Show infobox if Arstotzka selected
  countryDropdown.addEventListener('change', () => {
    if (countryDropdown.value === 'Arstotzka') {
      arstotzkaBox.style.display = 'block';
    } else {
      arstotzkaBox.style.display = 'none';
    }
  });

  // Auto-check sidebar box & hide infobox when all are checked
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const allChecked = checkboxes.every(c => c.checked);
      if (allChecked) {
        passportCheckbox.checked = true;
        arstotzkaBox.style.display = 'none';
      }
    });
  });
});
