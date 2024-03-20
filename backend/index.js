
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const connectDatabase = require('./config/connectDB');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods:["POST", "GET"],
        credentials: true
    }
));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectDatabase();

// Use the routes
app.use('/', routes);

// Listen to the app at port 5000
app.listen(5000, () => {
    console.log('App listening at port 5000');
});
