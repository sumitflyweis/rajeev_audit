const Driver = require("../model/driver");

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    // Find the driver by ID and update it with the request body
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Send the updated driver as a response
    res.json(updatedDriver);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while updating driver:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Delete driver
exports.deleteDriver = async (req, res) => {
  try {
    // Find the driver by ID and delete it
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);

    if (!deletedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Send a success message as a response
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while deleting driver:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
