const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const http = require('http');
//const server = http.createServer(app);
const bodyparser = require("body-parser");

const serverless = require("serverless-http");
require("dotenv").config();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3004;

mongoose
  .connect("mongodb+srv://node3:node3@cluster0.tcw8z5q.mongodb.net/audit_app?retryWrites=true&w=majority")
  .then(() => {
    console.log("Db conneted succesfully");
  })
  .catch((err) => {
    console.log(err);
  });


  app.get('/home', async (req, res, next) => {
    return res.status(200).json({
        message: "Welcome to api portal"
    })
})


app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//app.use(cookieParser());


//  ROUTES
app.use("/api/v1/user",require("./route/userCreate"));
//app.use("/api/v1/allotedSites",allotedSites)
app.use("/api/v1/adminLogin", require("./route/adminLogin"))
app.use("/api/v1/help",require("./route/help"))
app.use("/api/v1/CheckSheet",require("./route/CheckSheet"))
app.use("/api/v1/sites", require("./route/sites"))
app.use("/api/v1/audit",require("./route/audit"))
app.use("/api/v1/inspector",require("./route/inspector"))
app.use("/api/v1/reviewer",require("./route/reviewer"))
app.use("/api/v1/notification",require("./route/notification"))
app.use("/api/v1/terms",require("./route/termsAndCondition"))
app.use("/api/v1/privacy",require('./route/privacy'))
app.use("/api/v1/reports",require('./route/reports'))
app.use("/api/v1/client",require('./route/client'))
app.use("/api/v1/total",require('./route/total'))
app.use("/api/v1/bannerr",require("./route/banner"))
app.use("/api/v1/imagee",require("./route/image"))


// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't find the ${req.url} on this server!`,
//   });
// });


const server = app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});


module.exports = {
  handler: serverless(app),
};