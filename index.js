const app = require("./App");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const serverless = require("serverless-http");

process.on("uncaughtException", (err) => {
  console.log("unhandled Rejection! Shutting down...! hello");
  console.log(err.name, err.message);
  process.exit(1); // '1' stands for uncaught exception & '0' for success.
});

mongoose
  .connect("mongodb+srv://node3:node3@cluster0.tcw8z5q.mongodb.net/audit_app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DATABASE connected!! 👍");
  });


  app.get('/home', async (req, res, next) => {
    return res.status(200).json({
        message: "Welcome to api portal"
    })
})

const port = process.env.PORT || 3004;

const server = app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandled Rejection! Shutting down....!hi");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // '1' stands for uncaught exception & '0' for success.s
  });
});

module.exports = {
  handler: serverless(app),
};