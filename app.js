const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to databse
mongoose.connect(config.database);

// Log if connection successful
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// Log if connection failed
mongoose.connection.on('error', (err) => {
    console.log('Failed to connect to database: ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});
