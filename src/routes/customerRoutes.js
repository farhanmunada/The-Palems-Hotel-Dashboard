const express = require('express');
const router = express.Router();
const { getCustomers, addCustomer, updateCustomer, getCustomerById, deleteCustomer } = require('../handlers/handlerCustomer');

router.get('/', getCustomers);
router.post('/', addCustomer);
router.put('/:id', updateCustomer);
router.get('/:id', getCustomerById);
router.delete('/:id', deleteCustomer); // Ensure this line is present

module.exports = router;
