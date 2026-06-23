const API_URL = 'http://194.163.180.138:8080/api';

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    loadAllData();
    initForms();
});

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

async function loadAllData() {
    await Promise.all([
        loadMedicines(),
        loadCategories(),
        loadSuppliers(),
        loadUsers(),
        loadEntries(),
        loadExits()
    ]);
}

async function loadMedicines() {
    const res = await fetch(`${API_URL}/medicines`);
    const medicines = await res.json();
    const tbody = document.getElementById('medicinesTable');
    tbody.innerHTML = medicines.map(m => `
        <tr>
            <td>${m.id}</td>
            <td>${m.name}</td>
            <td>${m.type || '-'}</td>
            <td>${m.expirationDate}</td>
            <td>${m.stock}</td>
            <td>${m.category?.name || '-'}</td>
            <td>${m.supplier?.name || '-'}</td>
            <td>
                <button class="btn-edit" onclick="editMedicine(${m.id})">Editar</button>
                <button class="btn-danger" onclick="deleteMedicine(${m.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

async function loadCategories() {
    const res = await fetch(`${API_URL}/categories`);
    const categories = await res.json();
    const tbody = document.getElementById('categoriesTable');
    tbody.innerHTML = categories.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.description || '-'}</td>
            <td>
                <button class="btn-edit" onclick="editCategory(${c.id})">Editar</button>
                <button class="btn-danger" onclick="deleteCategory(${c.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
    await populateCategorySelects();
}

async function loadSuppliers() {
    const res = await fetch(`${API_URL}/suppliers`);
    const suppliers = await res.json();
    const tbody = document.getElementById('suppliersTable');
    tbody.innerHTML = suppliers.map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.contact || '-'}</td>
            <td>${s.phone || '-'}</td>
            <td>${s.email || '-'}</td>
            <td>
                <button class="btn-edit" onclick="editSupplier(${s.id})">Editar</button>
                <button class="btn-danger" onclick="deleteSupplier(${s.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
    await populateSupplierSelects();
}

async function loadUsers() {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = users.map(u => `
        <tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.username}</td>
            <td>${u.role || '-'}</td>
            <td>
                <button class="btn-edit" onclick="editUser(${u.id})">Editar</button>
                <button class="btn-danger" onclick="deleteUser(${u.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
    await populateUserSelects();
}

async function loadEntries() {
    const res = await fetch(`${API_URL}/entries`);
    const entries = await res.json();
    const tbody = document.getElementById('entriesTable');
    tbody.innerHTML = entries.map(e => `
        <tr>
            <td>${e.id}</td>
            <td>${e.medicine?.name || '-'}</td>
            <td>${e.quantity}</td>
            <td>${new Date(e.entryDate).toLocaleString()}</td>
            <td>${e.user?.name || '-'}</td>
        </tr>
    `).join('');
}

async function loadExits() {
    const res = await fetch(`${API_URL}/exits`);
    const exits = await res.json();
    const tbody = document.getElementById('exitsTable');
    tbody.innerHTML = exits.map(e => `
        <tr>
            <td>${e.id}</td>
            <td>${e.medicine?.name || '-'}</td>
            <td>${e.quantity}</td>
            <td>${new Date(e.exitDate).toLocaleString()}</td>
            <td>${e.user?.name || '-'}</td>
            <td>${e.reason || '-'}</td>
        </tr>
    `).join('');
}

async function populateCategorySelects() {
    const res = await fetch(`${API_URL}/categories`);
    const categories = await res.json();
    const selects = document.querySelectorAll('#medicineCategory');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Seleccione...</option>' +
            categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    });
}

async function populateSupplierSelects() {
    const res = await fetch(`${API_URL}/suppliers`);
    const suppliers = await res.json();
    const selects = document.querySelectorAll('#medicineSupplier');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Seleccione...</option>' +
            suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    });
}

async function populateUserSelects() {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();
    const selects = document.querySelectorAll('#entryUser, #exitUser');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Seleccione...</option>' +
            users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
    });
}

async function populateMedicineSelects() {
    const res = await fetch(`${API_URL}/medicines`);
    const medicines = await res.json();
    const selects = document.querySelectorAll('#entryMedicine, #exitMedicine');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Seleccione...</option>' +
            medicines.map(m => `<option value="${m.id}">${m.name} (Stock: ${m.stock})</option>`).join('');
    });
}

function openMedicineModal() {
    document.getElementById('medicineModalTitle').textContent = 'Agregar Medicamento';
    document.getElementById('medicineForm').reset();
    document.getElementById('medicineId').value = '';
    document.getElementById('medicineModal').style.display = 'block';
}

async function editMedicine(id) {
    const res = await fetch(`${API_URL}/medicines/${id}`);
    const m = await res.json();
    document.getElementById('medicineModalTitle').textContent = 'Editar Medicamento';
    document.getElementById('medicineId').value = m.id;
    document.getElementById('medicineName').value = m.name;
    document.getElementById('medicineDescription').value = m.description || '';
    document.getElementById('medicineType').value = m.type || '';
    document.getElementById('medicineExpiration').value = m.expirationDate;
    document.getElementById('medicineCategory').value = m.category?.id || '';
    document.getElementById('medicineSupplier').value = m.supplier?.id || '';
    document.getElementById('medicineModal').style.display = 'block';
}

async function deleteMedicine(id) {
    if (confirm('¿Está seguro?')) {
        await fetch(`${API_URL}/medicines/${id}`, { method: 'DELETE' });
        loadMedicines();
    }
}

function openCategoryModal() {
    document.getElementById('categoryModalTitle').textContent = 'Agregar Categoría';
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryModal').style.display = 'block';
}

async function editCategory(id) {
    const res = await fetch(`${API_URL}/categories/${id}`);
    const c = await res.json();
    document.getElementById('categoryModalTitle').textContent = 'Editar Categoría';
    document.getElementById('categoryId').value = c.id;
    document.getElementById('categoryName').value = c.name;
    document.getElementById('categoryDescription').value = c.description || '';
    document.getElementById('categoryModal').style.display = 'block';
}

async function deleteCategory(id) {
    if (confirm('¿Está seguro?')) {
        await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
        loadCategories();
    }
}

function openSupplierModal() {
    document.getElementById('supplierModalTitle').textContent = 'Agregar Proveedor';
    document.getElementById('supplierForm').reset();
    document.getElementById('supplierId').value = '';
    document.getElementById('supplierModal').style.display = 'block';
}

async function editSupplier(id) {
    const res = await fetch(`${API_URL}/suppliers/${id}`);
    const s = await res.json();
    document.getElementById('supplierModalTitle').textContent = 'Editar Proveedor';
    document.getElementById('supplierId').value = s.id;
    document.getElementById('supplierName').value = s.name;
    document.getElementById('supplierContact').value = s.contact || '';
    document.getElementById('supplierPhone').value = s.phone || '';
    document.getElementById('supplierEmail').value = s.email || '';
    document.getElementById('supplierAddress').value = s.address || '';
    document.getElementById('supplierModal').style.display = 'block';
}

async function deleteSupplier(id) {
    if (confirm('¿Está seguro?')) {
        await fetch(`${API_URL}/suppliers/${id}`, { method: 'DELETE' });
        loadSuppliers();
    }
}

function openUserModal() {
    document.getElementById('userModalTitle').textContent = 'Agregar Usuario';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('userModal').style.display = 'block';
}

async function editUser(id) {
    const res = await fetch(`${API_URL}/users/${id}`);
    const u = await res.json();
    document.getElementById('userModalTitle').textContent = 'Editar Usuario';
    document.getElementById('userId').value = u.id;
    document.getElementById('userName').value = u.name;
    document.getElementById('userUsername').value = u.username;
    document.getElementById('userPassword').value = u.password;
    document.getElementById('userRole').value = u.role || '';
    document.getElementById('userModal').style.display = 'block';
}

async function deleteUser(id) {
    if (confirm('¿Está seguro?')) {
        await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
        loadUsers();
    }
}

async function openEntryModal() {
    await populateMedicineSelects();
    document.getElementById('entryForm').reset();
    document.getElementById('entryModal').style.display = 'block';
}

async function openExitModal() {
    await populateMedicineSelects();
    document.getElementById('exitForm').reset();
    document.getElementById('exitModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function initForms() {
    document.getElementById('medicineForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('medicineId').value;
        const categoryId = document.getElementById('medicineCategory').value;
        const supplierId = document.getElementById('medicineSupplier').value;
        const data = {
            name: document.getElementById('medicineName').value,
            description: document.getElementById('medicineDescription').value,
            type: document.getElementById('medicineType').value,
            expirationDate: document.getElementById('medicineExpiration').value,
            category: categoryId ? { id: parseInt(categoryId) } : null,
            supplier: supplierId ? { id: parseInt(supplierId) } : null
        };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/medicines/${id}` : `${API_URL}/medicines`;
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModal('medicineModal');
        loadMedicines();
    });

    document.getElementById('categoryForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('categoryId').value;
        const data = {
            name: document.getElementById('categoryName').value,
            description: document.getElementById('categoryDescription').value
        };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/categories/${id}` : `${API_URL}/categories`;
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModal('categoryModal');
        loadCategories();
    });

    document.getElementById('supplierForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('supplierId').value;
        const data = {
            name: document.getElementById('supplierName').value,
            contact: document.getElementById('supplierContact').value,
            phone: document.getElementById('supplierPhone').value,
            email: document.getElementById('supplierEmail').value,
            address: document.getElementById('supplierAddress').value
        };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/suppliers/${id}` : `${API_URL}/suppliers`;
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModal('supplierModal');
        loadSuppliers();
    });

    document.getElementById('userForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('userId').value;
        const data = {
            name: document.getElementById('userName').value,
            username: document.getElementById('userUsername').value,
            password: document.getElementById('userPassword').value,
            role: document.getElementById('userRole').value
        };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/users/${id}` : `${API_URL}/users`;
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModal('userModal');
        loadUsers();
    });

    document.getElementById('entryForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            medicine: { id: parseInt(document.getElementById('entryMedicine').value) },
            quantity: parseInt(document.getElementById('entryQuantity').value),
            user: { id: parseInt(document.getElementById('entryUser').value) }
        };
        await fetch(`${API_URL}/entries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModal('entryModal');
        loadEntries();
        loadMedicines();
    });

    document.getElementById('exitForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            medicine: { id: parseInt(document.getElementById('exitMedicine').value) },
            quantity: parseInt(document.getElementById('exitQuantity').value),
            user: { id: parseInt(document.getElementById('exitUser').value) },
            reason: document.getElementById('exitReason').value
        };
        await fetch(`${API_URL}/exits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeModal('exitModal');
        loadExits();
        loadMedicines();
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}
