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

function addCheckbox(labelText) {
    const label = document.createElement('label');
    label.style.display = 'block'; // makes each checkbox appear on its own line
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
