document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/api/customers')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched customers:', data);
            const customerTableBody = document.getElementById('customer-table-body');
            customerTableBody.innerHTML = '';
            data.sort((a, b) => b.id - a.id);
            data.forEach(customer => {
                const row = document.createElement('tr');
                row.setAttribute('data-id', customer.id);
                row.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.full_name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone_number}</td>
                    <td>${customer.cek_in}</td>
                    <td>${customer.cek_out}</td>
                    <td>${customer.room_type}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editCustomer(${customer.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customer.id})">Delete</button>
                    </td>
                `;
                customerTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching customer data:', error));

    document.getElementById('addCustomerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newCustomer = {
            full_name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone_number: document.getElementById('customerPhone').value,
            cek_in: document.getElementById('customerCheckIn').value,
            cek_out: document.getElementById('customerCheckOut').value,
            room_type: document.getElementById('customerRoomType').value
        };
        fetch('http://localhost:5000/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(response => response.json())
        .then(customer => {
            console.log('Added customer:', customer);
            const customerTableBody = document.getElementById('customer-table-body');
            const row = document.createElement('tr');
            row.setAttribute('data-id', customer.id);
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.full_name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone_number}</td>
                <td>${customer.cek_in}</td>
                <td>${customer.cek_out}</td>
                <td>${customer.room_type}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editCustomer(${customer.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
            `;
            customerTableBody.prepend(row); // Add new customer to the top
            $('#addCustomerModal').modal('hide');
        })
        .catch(error => console.error('Error adding customer:', error));
    });

    document.getElementById('editCustomerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const customerId = document.getElementById('editCustomerId').value;
        const updatedCustomer = {
            full_name: document.getElementById('editCustomerName').value,
            email: document.getElementById('editCustomerEmail').value,
            phone_number: document.getElementById('editCustomerPhone').value,
            cek_in: document.getElementById('editCustomerCheckIn').value,
            cek_out: document.getElementById('editCustomerCheckOut').value,
            room_type: document.getElementById('editCustomerRoomType').value
        };
        fetch(`http://localhost:5000/api/customers/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => response.json())
        .then(customer => {
            console.log('Updated customer:', customer);
            const customerTableBody = document.getElementById('customer-table-body');
            const row = document.querySelector(`#customer-table-body tr[data-id='${customer.id}']`);
            if (row) {
                row.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.full_name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone_number}</td>
                    <td>${customer.cek_in}</td>
                    <td>${customer.cek_out}</td>
                    <td>${customer.room_type}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editCustomer(${customer.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customer.id})">Delete</button>
                    </td>
                `;
            }
            $('#editCustomerModal').modal('hide');
        })
        .catch(error => console.error('Error updating customer:', error));
    });

    window.editCustomer = function(id) {
        fetch(`http://localhost:5000/api/customers/${id}`)
            .then(response => response.json())
            .then(customer => {
                console.log('Fetched customer for editing:', customer);
                document.getElementById('editCustomerId').value = customer.id;
                document.getElementById('editCustomerName').value = customer.full_name;
                document.getElementById('editCustomerEmail').value = customer.email;
                document.getElementById('editCustomerPhone').value = customer.phone_number;
                document.getElementById('editCustomerCheckIn').value = customer.cek_in;
                document.getElementById('editCustomerCheckOut').value = customer.cek_out;
                document.getElementById('editCustomerRoomType').value = customer.room_type;
                $('#editCustomerModal').modal('show');
            })
            .catch(error => console.error('Error fetching customer data:', error));
    };

    window.deleteCustomer = function(id) {
        if (confirm('Are you sure you want to delete this customer?')) {
            fetch(`http://localhost:5000/api/customers/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                console.log('Deleted customer:', result);
                const row = document.querySelector(`#customer-table-body tr[data-id='${id}']`);
                if (row) {
                    row.remove();
                }
            })
            .catch(error => console.error('Error deleting customer:', error));
        }
    };

    fetch('http://localhost:5000/api/contacts')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched contacts:', data);
            const contactTableBody = document.getElementById('contact-table-body');
            contactTableBody.innerHTML = '';
            data.sort((a, b) => b.id - a.id);
            data.forEach(contact => {
                const row = document.createElement('tr');
                row.setAttribute('data-id', contact.id);
                row.innerHTML = `
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.message}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editContact(${contact.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id})">Delete</button>
                    </td>
                `;
                contactTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching contact data:', error));

    document.getElementById('addContactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newContact = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value
        };
        fetch('http://localhost:5000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        })
        .then(response => response.json())
        .then(contact => {
            console.log('Added contact:', contact);
            const contactTableBody = document.getElementById('contact-table-body');
            const row = document.createElement('tr');
            row.setAttribute('data-id', contact.id);
            row.innerHTML = `
                <td>${contact.id}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.message}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editContact(${contact.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id})">Delete</button>
                </td>
            `;
            contactTableBody.prepend(row);
            $('#addContactModal').modal('hide');
        })
        .catch(error => console.error('Error adding contact:', error));
    });

    document.getElementById('editContactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const contactId = document.getElementById('editContactId').value;
        const updatedContact = {
            name: document.getElementById('editContactName').value,
            email: document.getElementById('editContactEmail').value,
            message: document.getElementById('editContactMessage').value
        };
        fetch(`http://localhost:5000/api/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedContact)
        })
        .then(response => response.json())
        .then(contact => {
            console.log('Updated contact:', contact);
            const contactTableBody = document.getElementById('contact-table-body');
            const row = document.querySelector(`#contact-table-body tr[data-id='${contact.id}']`);
            if (row) {
                row.innerHTML = `
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.message}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editContact(${contact.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id})">Delete</button>
                    </td>
                `;
            }
            $('#editContactModal').modal('hide');
        })
        .catch(error => console.error('Error updating contact:', error));
    });

    window.editContact = function(id) {
        fetch(`http://localhost:5000/api/contacts/${id}`)
            .then(response => response.json())
            .then(contact => {
                console.log('Fetched contact for editing:', contact);
                document.getElementById('editContactId').value = contact.id;
                document.getElementById('editContactName').value = contact.name;
                document.getElementById('editContactEmail').value = contact.email;
                document.getElementById('editContactMessage').value = contact.message;
                $('#editContactModal').modal('show');
            })
            .catch(error => console.error('Error fetching contact data:', error));
    };

    window.deleteContact = function(id) {
        if (confirm('Are you sure you want to delete this contact?')) {
            fetch(`http://localhost:5000/api/contacts/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                console.log('Deleted contact:', result);
                const row = document.querySelector(`#contact-table-body tr[data-id='${id}']`);
                if (row) {
                    row.remove();
                }
            })
            .catch(error => console.error('Error deleting contact:', error));
        }
    };
});
