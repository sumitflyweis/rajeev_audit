const express = require('express');
const router = express.Router();

const driverController = require('../controller/driver');



router.post('/', driverController.createDriver);

// GET driver by ID
router.get('/:id', driverController.getDriverById);

// GET all drivers
router.get('/', driverController.getAllDrivers);

// UPDATE driver by ID
router.put('/:id', driverController.updateDriver);

// DELETE driver by ID
router.delete('/:id', driverController.deleteDriver);

module.exports = router;
