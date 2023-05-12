const Driver = require("../model/driver");

exports.createDriver = async (req, res) => {
  try {
    const { authid, gender, firstName, lastName, ResumeTitle, location, exactAddress, category, language, militaryService, DateOfBirth, licienceNumber } = req.body;
    
    const newDriver = new Driver({
      authid,
      gender,
      firstName,
      lastName,
      ResumeTitle,
      location,
      exactAddress,
      category,
      language,
      militaryService,
      DateOfBirth,
      licienceNumber
    });

    const savedDriver = await newDriver.save();

    res.status(201).json(savedDriver);
  } catch (error) {
    console.error('Error creating driver:', error);
    res.status(500).json({ error: 'An error occurred while creating the driver.' });
  }
};


// GET driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .populate('authid')
      .populate('location')
      .populate('category')
      .populate('language');

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json(driver);
  } catch (error) {
    console.error('Error fetching driver:', error);
    res.status(500).json({ error: 'An error occurred while fetching the driver' });
  }
};



// GET all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
      .populate('authid')
      .populate('location')
      .populate('category')
      .populate('language');

    res.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ error: 'An error occurred while fetching the drivers' });
  }
};


// UPDATE driver by ID
exports.updateDriver = async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json(updatedDriver);
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ error: 'An error occurred while updating the driver' });
  }
};

// DELETE driver by ID
exports.deleteDriver = async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndRemove(req.params.id);

    if (!deletedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ error: 'An error occurred while deleting the driver' });
  }
};
