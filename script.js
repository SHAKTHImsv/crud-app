// script.js
const form = document.getElementById('frm');
const tblBody = document.getElementById('tblBody');
let editId = null;

// Load existing data from local storage
document.addEventListener('DOMContentLoaded', loadData);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const city = document.getElementById('city').value;

    if (editId) {
        // Update existing record
        updateData(editId, { name, age, city });
    } else {
        // Create new record
        createData({ name, age, city });
    }

    resetForm();
    loadData();
});

function loadData() {
    tblBody.innerHTML = '';
    const data = JSON.parse(localStorage.getItem('crudData')) || [];
    
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.city}</td>
            <td>
                <button onclick="editData('${item.id}')">
                    <ion-icon name="pencil-outline"></ion-icon>
                </button>
            </td>
            <td>
                <button class="btn-delete" onclick="deleteData('${item.id}')">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>
        `;
        tblBody.appendChild(row);
    });
}

function createData(data) {
    const currentData = JSON.parse(localStorage.getItem('crudData')) || [];
    const newData = { id: Date.now().toString(), ...data };
    currentData.push(newData);
    localStorage.setItem('crudData', JSON.stringify(currentData));
}

function editData(id) {
    const data = JSON.parse(localStorage.getItem('crudData')) || [];
    const itemToEdit = data.find(item => item.id === id);

    if (itemToEdit) {
        document.getElementById('name').value = itemToEdit.name;
        document.getElementById('age').value = itemToEdit.age;
        document.getElementById('city').value = itemToEdit.city;
        document.getElementById('id').value = itemToEdit.id;
        editId = itemToEdit.id;
    }
}

function updateData(id, updatedData) {
    const currentData = JSON.parse(localStorage.getItem('crudData')) || [];
    const updatedDataArray = currentData.map(item => (item.id === id ? { ...item, ...updatedData } : item));
    localStorage.setItem('crudData', JSON.stringify(updatedDataArray));
    editId = null;
}

function deleteData(id) {
    const currentData = JSON.parse(localStorage.getItem('crudData')) || [];
    const filteredData = currentData.filter(item => item.id !== id);
    localStorage.setItem('crudData', JSON.stringify(filteredData));
    loadData();
}

function resetForm() {
    form.reset();
    editId = null;
}
