const Location = require("../model/location");

// Controller function to handle a request
exports.getLocation = async (req, res) => {
  try {
    // Retrieve all locations from the database
    const locations = await Location.find();

    // Send the locations as a response
    res.json(locations);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while retrieving locations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to create a new location
exports.createLocation = async (req, res) => {
  try {
    // Create a new location document using the request body
    const newLocation = await Location.create(req.body);

    // Send the newly created location as a response
    res.status(201).json(newLocation);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while creating location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.getLocationById = async (req, res) => {
  try {
    // Retrieve the location by ID from the database
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Send the location as a response
    res.json(location);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while retrieving location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update location
exports.updateLocation = async (req, res) => {
  try {
    // Find the location by ID and update it with the request body
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Send the updated location as a response
    res.json(updatedLocation);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while updating location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Delete location
exports.deleteLocation = async (req, res) => {
  try {
    // Find the location by ID and delete it
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);

    if (!deletedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Send a success message as a response
    res.json({ message: "Location deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while deleting location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



