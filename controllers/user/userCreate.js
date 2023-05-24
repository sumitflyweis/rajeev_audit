const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../../model/userCreate");
const bcrypt = require("bcryptjs");
const JWT_EXPIRES_IN = "1d"
require("dotenv").config();

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  }); 
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  console.log(token);

//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };
 // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.setHeader("x-api-key", /* "Bearer "*/ +token);

  // Remove the password from the output
  user.password = undefined;

  console.log("hi");
  //console.log(user.otp);
  res.status(statusCode).json({
    status: "success",
    token, 
    user,
    otp: user.otp,
  });
};  

module.exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const verifyOtp = await User.findOne({
      otp: otp,
    });
    if (!verifyOtp || verifyOtp.length == 0) {
      return res.status(400).json({ msg: "invalid otp" });
    } else {
      const data = { id: verifyOtp._id, phone: verifyOtp.phone };
      console.log(data);
      const token = jwt.sign(
        { id: verifyOtp._id.toString() },
        process.env.NODE_ENV,
        {
          expiresIn: "1d",
        }
      );
      console.log(token);
      res.setHeader("x-api-key", /* "Bearer "*/ +token);
      return res
        .status(200)
        .json({ msg: "signIn successfull", data: data, Token: token });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};

exports.signup = async (req, res) => {
    try{
    const email = await User.findOne({email:req.body.email})
    if(email) return res.status(200).send({msg:"email already present "})
  const newUser = await User.create(req.body);
  //const url = `${req.protocol}://${req.get("host")}/me`;
  console.log(newUser);
 return res .status(200).send({msg:"true",newUser})
  //   await new Email(newUser, url).sendWelcome();

  //createSendToken(newUser, 201, res);
}catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
}



module.exports.getAll = async (req, res) => {
  try {
    const sites = await User.find();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const site = await User.findById(req.params.id);
    if (site == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.json({msg:site});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const site = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!site) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(site);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// exports.socialLogin = async (req, res) => {
//   try {
//     const { google_id, name, email } = req.body;

//     const user = await User.findOne({ google_id: google_id });
//     console.log(user);
//     if (!user || user.length == 0) {
//       const data1 = {
//         google_id: req.body.google_id,
//         firstName: req.body.firstName,
//         middleName: req.body.middleName,
//         lastName: req.body.lastName,
//         fullName: req.body.fullName,
//         country: req.body.country,
//         email: req.body.email,
//         password: req.body.password,
//         phone: req.body.phone,
//         role: req.body.role,
//         passwordChangedAt: req.body.passwordChangedAt,
//         passwordResetToken: req.body.passwordResetToken,
//         passwordResetExpires: req.body.passwordResetExpires,
//         active: req.body.active,
//       };
//       console.log("hi")
//       const create = await User.create(data1);
//       console.log(create);

//       createSendToken(create, 201, res);
//       }
//     console.log("second")
//     createSendToken(user, 201, res);
//      } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .send({ error: "internal server error" + err.message });
//   }
// };


exports.login = async (req, res, next) => {
  
  const { input, password } = req.body;
  if (!input || !password) {
    return res.status(400).send("Please provide e-mail and password!");
  }

  if (validator.isEmail(input)) {
    
    var email = input;

    const user = await User.findOne({ email: email }).select("+password");
    console.log(user.password);

    if (!user /*|| !(await user.correctPassword(password, user.password))*/) {
      return res.status(400).send("Incorrect Email");
    }
        const isMatch = bcrypt.compareSync(password, user.password);
    console.log(isMatch)
        if (!isMatch) {
          return res.status(404).send("Invalid email or password");
        }
   
    // const otp = Math.floor(Math.random() * 10000 + 1);
    // console.log(otp);
    // user.otp = otp;
    // await user.save();
    // console.log("USer", user);

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } else {
    var phone = input;
    const user = await User.findOne({ phone: phone }).select("+password");
    console.log(user.password);
    if (!user /*|| !(await user.correctPassword(password, user.password))*/) {
      return res.status(400).send("Incorrect Phone");
    }
    const otp1 = Math.floor(Math.random() * 10000 + 1);
    console.log("OTP", otp1);
    user.otp = otp1;

    await user.save();
    console.log("USer", user);

    createSendToken(user, 200, res);
  }
}

// exports.protect = catchAsync(async (req, res, next) => {
//   // 1) Getting Token & check if its there!
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies) {
//     if (req.cookies.jwt) {
//       token = req.cookies.jwt;
//     }
//   }
//   // console.log(token);
//   // console.log(req.header.authorization);
//   if (!token) {
//     return next(
//       new AppError("You are not logged in!, please login to get access!", 401)
//     );
//   }

//   // 2) Verification of Token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exists.
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to this token no  longer Exists!", 401)
//     );
//   }

//   // // 4) Check if user changed password after the token was issued.
//   // if (currentUser.changedPasswordAfter(decoded.iat)) {
//   //   return next(
//   //     new AppError("User recently changed password! Please login again.", 401)
//   //   );
//   // }

//   // PUTS USER OBJECT ON OUR REQUEST OBJECT.
//   req.user = currentUser;
//   res.locals.user = currentUser;
//   next();
// });

// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     //roles = ['admin','lead-guide']. role = 'user'
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError(
//           "you do not have permission to perform this operation!",
//           403
//         )
//       );
//     }
//     next();
//   };
// };

// // exports.resetPassword = catchAsync(async (req, res, next) => {
// //   // 1) Get user based on the token.
// //   const hashedToken = crypto
// //     .createHash("sha256")
// //     .update(req.params.token)
// //     .digest("hex");

// //   const user = await User.findOne({
// //     passwordResetToken: hashedToken,
// //     passwordResetExpires: { $gt: Date.now() },
// //   });

// //   // 2) If token is not expired, and there is user, set the new password
// //   if (!user) {
// //     return next(new AppError("Token is invalid or expired", 400));
// //   }
// //   user.password = req.body.password;
// //   user.passwordConfirm = req.body.passwordConfirm;
// //   user.passwordResetToken = undefined;
// //   user.passwordResetExpires = undefined;
// //   await user.save();

// //   // 3) Update changedPasswordAt property for the user
// //   // DONE IN THE USER MODEL.
// //   // 4) Log the user in, send JWT.
// //   createSendToken(user, 200, res);
// // });

exports.forgetPassword = async (req, res, next) => {
  try {
    const requiredotp = await User.findOne({ email:req.body.email });
    console.log(requiredotp.email)
if(!requiredotp || requiredotp.length == 0) return res.status(400).send("incorrect email")

  if (req.body.password !== req.body.confirmpassword) return next(createError(400, "password not match"));
         
    const user = await User.findOneAndUpdate(
      {
        email: req.body.email,
      },
      { password: bcrypt.hashSync(req.body.password, 8) },
      { new: true }
    );
    console.log(user);
    return res.status(200).send({ msg: true, user });
   }catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   // 1) Get user from collection
//   const user = await User.findById(req.user.id).select("+password");

//   if (!user) {
//     return next(
//       new AppError("There is no user with this E-mail address!", 404)
//     );
//   }
//   // 2) Check if POSTed current password is correct.
//   if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//     return next(new AppError("The password is incorrect!", 401));
//   }

//   // 3) If so, Update the password
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();

//   // 4) Log user in, send JWT
//   createSendToken(user, 200, res);
// });

// exports.logout = (req, res) => {
//   res.cookie("jwt", "loggedout", {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// }
