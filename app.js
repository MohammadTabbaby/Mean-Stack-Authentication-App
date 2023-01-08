const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const config = require('./config/database')

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('CONNECTED TO : ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('ERROR IN DATABASE CONNECTION : ' + err);
});

const app = express();
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla'
}));

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

const users = require('./routes/users');

app.use('/users', users)

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Invalid Endpoint !')
});

const port = 3000;
app.listen(port, () => {
    console.log('Server Started on port ' + port);
});
