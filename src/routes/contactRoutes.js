const express = require('express');
const router = express.Router();
const { getContacts, addContact, updateContact, getContactById, deleteContact } = require('../handlers/handlerContact');

router.get('/', getContacts);
router.post('/', addContact);
router.put('/:id', updateContact);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

module.exports = router;
