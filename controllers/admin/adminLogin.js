const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Admin = require("../../model/adminLogin");
const jwt = require("jsonwebtoken")

// CREATE

module.exports.signup = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ email, password: hashedPassword, role });
  try {
    await newAdmin.save();
    res.status(201).send(newAdmin);
  } catch (err) {
    res.status(400).send(err);
  }
};

// READ
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminexists = await Admin.findOne({
      email:email,
    });
    if (!adminexists || adminexists.length == 0)
      return res.status(403).json({ msg: "admin does not exist" });

    const ispasswordValid = bcrypt.compareSync(
    password,adminexists.password)
    console.log(ispasswordValid);

    if (!ispasswordValid) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }
    const token = jwt.sign({id:adminexists._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    console.log(token);
    res.setHeader("x-api-key", /* "Bearer "*/ +token);
    return res.status(200).json({
      msg: "login successfull",
      Token: token,
      _id: adminexists._id,
      email: adminexists.email,
      role:adminexists.role,
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};

// UPDATE
module.exports.updateadmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!admin) {
      return res.status(404).send();
    }
    res.send(admin);
  } catch (err) {
    res.status(400).send(err);
  }
}

// DELETE
module.exports.deleteadmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).send();
    }
    res.send(admin);
  } catch (err) {
    res.status(500).send(err);
  }
}

// // LOGIN
// router.post("/admin/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).send("Invalid email or password");
//     }
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).send("Invalid email or password");
//     }
//     res.send("Logged in successfully");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// module.exports = router;
