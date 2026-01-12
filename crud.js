// Load data when page opens
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

// 1. Function to Fetch Data from Database
function fetchData() {
    fetch('code.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'read' })
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        data.forEach(item => {
            tableBody.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>
                        <button class="btn-edit" onclick="editData(${item.id}, '${item.name}', '${item.email}')">Edit</button>
                        <button class="btn-delete" onclick="deleteData(${item.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    });
}

// 2. Function to Save (Add or Update)
function saveData() {
    const id = document.getElementById('edit-index').value; // This is now the Database ID
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name === '' || email === '') {
        alert("Please fill in all fields");
        return;
    }

    let action = (id === '') ? 'create' : 'update';
    
    const data = {
        action: action,
        id: id,
        name: name,
        email: email
    };

    fetch('code.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if(result.status === 'success') {
            // Clear Form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('edit-index').value = '';
            document.getElementById('save-btn').innerText = 'Add Data';
            
            // Reload Table
            fetchData();
        } else {
            alert('Something went wrong');
        }
    });
}

// 3. Function to Prepare Edit
function editData(id, name, email) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('edit-index').value = id; // Store ID
    document.getElementById('save-btn').innerText = 'Update Data';
}

// 4. Function to Delete
function deleteData(id) {
    if(confirm('Are you sure you want to delete this?')) {
        fetch('code.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete', id: id })
        })
        .then(response => response.json())
        .then(result => {
            if(result.status === 'success') {
                fetchData();
            } else {
                alert('Failed to delete');
            }
        });
    }
}
