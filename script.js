const dropdown = document.getElementById('countryDropdown');
const checklist = document.getElementById('checklist');

function updateChecklist(country) {
    checklist.innerHTML = ''; // Clear current list

    // Always present
    const items = ['Passport', 'Polio Vaccine'];

    // Conditional
    if (country && country !== "Country") {
        if (country === "Arstotzka") {
            items.push("ID");
        } else {
            items.push("Access Permit");
        }
    }

    // Add checkboxes
    items.forEach(item => {
        addCheckbox(item);
    });
}

let checkboxCounter = 0; // to ensure unique IDs

function addCheckbox(labelText) {
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-wrapper-47';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const checkboxId = 'cb-' + checkboxCounter++;
    checkbox.id = checkboxId;
    checkbox.name = 'cb';

    const label = document.createElement('label');
    label.htmlFor = checkboxId;
    label.textContent = labelText;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    checklist.appendChild(wrapper);
}

// Initial load
updateChecklist(dropdown.value);

// Update on change
dropdown.addEventListener('change', () => {
    updateChecklist(dropdown.value);
});
