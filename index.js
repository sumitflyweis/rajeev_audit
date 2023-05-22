const mongoose = require('mongoose');
// const serverless = require('serverless-http')
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('error', (error) => console.log(error));
mongoose.set('strictQuery', false);

app.listen(process.env.PORT || 3006, async () => {
    mongoose.connect(process.env.DATABASE || "mongodb+srv://gadi_Driver:ME7nq2lmqnIgUt3w@cluster0.kg5relm.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`listening on port ${process.env.PORT || 3006}`);
})

// module.exports = {
//     handler: serverless(app)
// }