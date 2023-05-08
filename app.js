
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
 const languages = require('./src/route/different_Language');
 const auth = require('./src/route/authEmployee&Owner')
//  const driverr = require('./src/route/driver')
const locationn = require('./src/route/location')
const categoryy   = require('./src/route/category')



const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());


 app.use('/api/v1/languages', languages);
 app.use('/api/v1/auth', auth);
//  app.use('/api/v1/driverr',driverr)
app.use('/api/v1/locationn',locationn)
app.use('/api/v1/categoryy',categoryy)



app.all('*', (req, res, next) => {
    return next(
        createError(404, 'Path does not exists'));
})


app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    if (err.status) {
        console.log(err);
        console.log('error middleware');
        return res.status(err.status).json({
            msg: err.message
        })

    } else {

        console.log(err);
        console.log('error middleware status not given');
        return res.status(500).json({
            msg: err.message
        })
    }

})


module.exports = app;