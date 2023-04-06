const Site = require("../../model/sites");

// CREATE
module.exports.createSite = async (req, res) => {
  try {
    const site = new Site(req.body);
    const result = await site.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
module.exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
module.exports.getSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (site == null) {
      return res.status(404).json({ message: "Cannot find site" });
    }
    res.json(site);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE
module.exports.updateSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (site == null) {
      return res.status(404).json({ message: "Cannot find site" });
    }
    if (req.body.QA_CA_ID != null) {
      site.QA_CA_ID = req.body.QA_CA_ID;
    }
    if (req.body.siteId != null) {
      site.siteId = req.body.siteId;
    }
    if (req.body.circle != null) {
      site.circle = req.body.circle;
    }
    if (req.body.location != null) {
      site.location = req.body.location;
    }
    if (req.body.address != null) {
      site.address = req.body.address;
    }
    if (req.body.clientName != null) {
      site.clientName = req.body.clientName;
    }
    if (req.body.date != null) {
      site.date = req.body.date;
    }
    if (req.body.allocateSiteToInspector != null) {
      site.allocateSiteToInspector = req.body.allocateSiteToInspector;
    }
    if (req.body.uploadFileFromDevice != null) {
        site.uploadFileFromDevice = req.body.uploadFileFromDevice;
      }
    const updatedSite = await site.save();
    res.json(updatedSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
module.exports.deleteSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (site == null) {
      return res.status(404).json({ message: "Cannot find site" });
    }
    await site.remove();
    res.json({ message: "Site deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
