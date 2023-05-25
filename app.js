// const morgan = require("morgan");
// const cors = require("cors");
// const createError = require("http-errors");
// const express = require("express");
// const languages = require("./src/route/different_Language");
// const auth = require("./src/route/authEmployee&Owner");
// const driverr = require("./src/route/driver");
// const locationn = require("./src/route/location");
// const categoryy = require("./src/route/category");
// const driver_experience = require("./src/route/driver_experience");
// const vehicletype = require("./src/route/vehicletype");
// const camAndBrowse = require("./src/route/cameraAndBrowse");
// const employ = require("./src/route/employer");
// const jobServices = require("./src/route/jobService");
// const subscrip = require('./src/route/subscription')
// const action = require('./src/route/employerAction')
// const categoryInterestt = require('./src/route/categoryInterest')
// const postt = require('./src/route/post')
// const help = require('./src/route/helpAndSupport')
// const Faq = require('./src/route/faq')
// const refer = require('./src/route/referAndEarn')
// const packageCompare = require('./src/route/gallery_packageUtilisation')
// const vedioo = require ('./src/route/vedio')
// const wishlistt = require('./src/route/wishlist')
// // const paymentt = require('./src/route/paymentGateway')

// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors());


// app.get('/', (req,res) =>{
//   res.status(200).json({
//       message: "Working"
//   })
// })
// app.use("/api/v1/languages", languages);
// app.use("/api/v1/auth", auth);
// app.use("/api/v1/driverr", driverr);
// app.use("/api/v1/locationn", locationn);
// app.use("/api/v1/categoryy", categoryy);
// app.use("/api/v1/driver_experience", driver_experience);
// app.use("/api/v1/vehicletype", vehicletype);
// app.use("/api/v1/camAndBrowse", camAndBrowse);
// app.use("/api/v1/employ", employ);
// app.use("/api/v1/jobServices", jobServices);
// app.use("/api/v1/subscrip",subscrip)
// app.use("/api/v1/action",action)
// app.use("/api/v1/categoryInterestt",categoryInterestt)
// app.use("/api/v1/postt",postt)
// app.use("/api/v1/help",help)
// app.use("/api/v1/Faq",Faq)
// app.use("/api/v1/refer",refer)
// app.use('/api/v1/packageCompare',packageCompare)
// app.use('/api/v1/vedioo',vedioo)
// app.use('/api/v1/wishlistt',wishlistt)
// // app.use('/api/v1/paymentt',paymentt)

// app.all("*", (req, res, next) => {
//   return next(createError(404, "Path does not exists"));
// });

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   if (err.status) {
//     console.log(err);
//     console.log("error middleware");
//     return res.status(err.status).json({
//       msg: err.message,
//     });
//   } else {
//     console.log(err);
//     console.log("error middleware status not given");
//     return res.status(500).json({
//       msg: err.message,
//     });
//   }
// });

// module.exports = app;
