let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
require('dotenv').config();

// let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DATABASE, {useMongoClient: true, promiseLibrary: require('bluebird')})
    .then(() => console.log('Connection Successful'))
    .catch((err) => console.error(err));

let book = require('./routes/book');
let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api/book', book);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
