const dropdown = document.getElementById('countryDropdown');
const checklistDocuments = document.getElementById('checklist-documents');
const checklistReasons = document.getElementById('checklist-reasons');

// Base items for documents
const baseItems = ['Passport', 'Polio Vaccine'];

// Reasons and their linked documents
const reasonMap = {
  Asylum: ['Grant'],
  Work: ['Permit'],
  Diplomat: ['Authorization', 'Fingerprints'],
  'Transit/Visiting': []
};

// State to keep selected reason
let selectedReason = null;

function updateChecklistDocuments(country, reason) {
  checklistDocuments.innerHTML = ''; // Clear current document list

  const items = [...baseItems];

  if (country && country !== "Country") {
    if (country === "Arstotzka") {
      items.push("ID");
    } else {
      items.push("Access Permit");
    }
  }

  if (reason && reasonMap[reason]) {
    items.push(...reasonMap[reason]);
  }

  // Add document checkboxes
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
      // Uncheck other checkboxes (simulate radio button behavior)
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

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const id = 'cb-' + labelText.replace(/\s+/g, '-').toLowerCase();
  checkbox.id = id;

  const label = document.createElement('label');
  label.htmlFor = id;
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
