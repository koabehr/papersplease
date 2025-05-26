const dropdown = document.getElementById('countryDropdown');
const checklist = document.getElementById('checklist');

function updateChecklist(country) {
    checklist.innerHTML = ''; // Clear current list

    // Always present
    const baseItems = ['Passport', 'Polio Vaccine'];
    baseItems.forEach(item => {
        addCheckbox(item);
    });

    // Conditional
    if (country === 'Arstotzka') {
        addCheckbox('ID');
    } else {
        addCheckbox('Access Permit');
    }
}

function addCheckbox(labelText) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + labelText));
    checklist.appendChild(label);
}

// Initial load
updateChecklist(dropdown.value);

// Update on change
dropdown.addEventListener('change', () => {
    updateChecklist(dropdown.value);
});
