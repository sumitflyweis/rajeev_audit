const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res, next) => {
    return res.status(200).json({
        message: "Welcome to api portal"
    })
})

const cookieParser = require("cookie-parser");
//const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./route/userCreate");
//const allotedSites = require("./route/allotedSites");
const adminLogin = require("./route/adminLogin");
const help = require("./route/help")
const checkSheet = require("./route/CheckSheet")
const sites = require("./route/sites")
const audit = require("./route/audit")
const inspector = require("./route/inspector")
const reviewer = require("./route/reviewer")
const notification = require("./route/notification") 


app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

//  ROUTES
app.use("/api/v1/user", userRouter);
//app.use("/api/v1/allotedSites",allotedSites)
app.use("/api/v1/adminLogin",adminLogin)
app.use("/api/v1/help",help)
app.use("/api/v1/CheckSheet",checkSheet)
app.use("/api/v1/sites",sites)
app.use("/api/v1/audit",audit)
app.use("/api/v1/inspector",inspector)
app.use("/api/v1/reviewer",reviewer)
app.use("/api/v1/notification",notification)



app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find the ${req.url} on this server!`,
  });
});


app.use(function (error, req, res, next) {
    if (error.status) {
        return res.status(error.status).json({
            errorName: error.name,
            message: error.message
        })
    } else {
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }  
})

module.exports = app;
