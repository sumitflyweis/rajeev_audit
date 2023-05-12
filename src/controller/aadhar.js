const axios = require("axios");
const AadharMatch = require("../model/aadhar");

// Function to match the front and back side of Aadhar card
//exports.matchAadhar = async (req, res) => {
// const {frontImage , backImage }= req.body
const matchAadhar = async (frontImage, backImage) => {
  // Implement your matching logic or call an external API to perform the comparison
  // For simplicity, let's assume we're making an API call to a matching service
  const response = await axios.post("https://your-matching-service.com/match", {
    frontImage,
    backImage,
  });

  return response.data.matched; // Assuming the response contains a 'matched' field indicating the result
};

// Controller to handle the Aadhar matching
exports.matchAadharCard = async (req, res) => {
  try {
    const { frontImage, backImage, driverId } = req.body;

    // Call the matchAadhar function to perform the comparison
    const matched = await matchAadhar(frontImage, backImage);

    // Create a new AadharMatch document with the result
    const aadharMatch = new AadharMatch({
      driverId,
      frontImage,
      backImage,
      matched,
    });

    // Save the AadharMatch document to the database
    const savedAadharMatch = await aadharMatch.save();

    res.status(200).json(savedAadharMatch);
  } catch (error) {
    console.error("Error matching Aadhar card:", error);
    res
      .status(500)
      .json({ error: "An error occurred while matching the Aadhar card" });
  }
};
