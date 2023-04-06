const HelpModel = require('../../model/help');

// Create a new help document
module.exports.helpAdmin = async (req,res) => {
    try{
    const newHelpDoc = await HelpModel.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    enquiry: req.body.enquiry,
  });
  console.log(newHelpDoc)

  return res.status(200).send(newHelpDoc)
}catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error.message, name: error.name });
  }
}


// Read a help document by ID
// const getHelpById = (id) => {
//   return HelpModel.findById(id).exec();
// };

// Read all help documents
module.exports.gethelp = () => {
  return HelpModel.find({}).exec();
};

// Update a help document by ID
module.exports.updateHelpAdmin = (id, name, email, phone, enquiry) => {
  return HelpModel.findByIdAndUpdate(id, {
    name: name,
    email: email,
    phone: phone,
    enquiry: enquiry,
  }).exec();
};

// Delete a help document by ID
module.exports.deleteHelpAdmin = (id) => {
  return HelpModel.findByIdAndDelete(id).exec();
};

