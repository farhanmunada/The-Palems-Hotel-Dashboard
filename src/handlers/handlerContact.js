const db = require('../config/db');

const getContacts = (req, res) => {
    db.query('SELECT * FROM contact', (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Fetched contacts:', results);
        res.json(results);
    });
};

const getContactById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM contact WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching contact:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        console.log('Fetched contact:', results[0]);
        res.json(results[0]);
    });
};

const addContact = (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO contact (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error adding contact:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Added contact:', { id: result.insertId, ...req.body });
        res.json({ id: result.insertId, ...req.body });
    });
};

const updateContact = (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const query = 'UPDATE contact SET name = ?, email = ?, message = ? WHERE id = ?';
    db.query(query, [name, email, message, id], (err) => {
        if (err) {
            console.error('Error updating contact:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Updated contact:', { id, ...req.body });
        res.json({ id, ...req.body });
    });
};

const deleteContact = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM contact WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting contact:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    });
};

module.exports = { getContacts, addContact, updateContact, getContactById, deleteContact };
