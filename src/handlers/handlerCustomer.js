const db = require('../config/db');

// Mengambil semua data customer
const getCustomers = (req, res) => {
    db.query('SELECT * FROM customer', (err, results) => {
        if (err) {
            console.error('Error fetching customers:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
};

// Mengambil data customer berdasarkan ID
const getCustomerById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM customer WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching customer:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        console.log('Fetched customer:', results[0]);
        res.json(results[0]);
    });
};

// Menambahkan data customer baru
const addCustomer = (req, res) => {
    const { full_name, email, phone_number, cek_in, cek_out, room_type } = req.body;

    // Validasi input untuk mencegah data kosong atau invalid
    if (!full_name || !email || !phone_number || !cek_in || !cek_out || !room_type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO customer (full_name, email, phone_number, room_type, cek_in, cek_out) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [full_name, email, phone_number, room_type, cek_in, cek_out], (err, result) => {
        if (err) {
            console.error('Error adding customer:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

// Mengupdate data customer berdasarkan ID
const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { full_name, email, phone_number, cek_in, cek_out, room_type } = req.body;

    // Validasi input
    if (!full_name || !email || !phone_number || !cek_in || !cek_out || !room_type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'UPDATE customer SET full_name = ?, email = ?, phone_number = ?, room_type = ?, cek_in = ?, cek_out = ? WHERE id = ?';
    db.query(query, [full_name, email, phone_number, room_type, cek_in, cek_out, id], (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json({ id, ...req.body });
    });
};

// Menghapus data customer berdasarkan ID
const deleteCustomer = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM customer WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    });
};

module.exports = { getCustomers, addCustomer, updateCustomer, getCustomerById, deleteCustomer };
