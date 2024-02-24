const dotenv = require('dotenv');

// dotenv Directory
dotenv.config({ path: '../../dotenv/config.env' })

// Express
const express = require('express');

// App -: To use express function
const app = express();
 
// Port
const port = 80 || process.env.PORT;

// DB
require('../db/conn');

// cookie Parser
const cookieParser = require('cookie-parser');

// Tell express u r using it
app.use(cookieParser());   // using as a middleware to fetch cookies from client browser

// Path
const path = require('path');

// Middleware to parse data coming from client side 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// HBS
const hbs = require('hbs');

// Router
const route = require('../routes/router');

// Static Directory Path
const staticPath = path.join(__dirname + '../../../frontend/public');

// Views Directory Path
const adminViewsPath = path.join(__dirname + '../../../frontend/temp/admins')
const userViewsPath = path.join(__dirname + '../../../frontend/temp/users')
const commonViewsPath = path.join(__dirname + '../../../frontend/temp/common')

// Partials Directory Path
const partialsPath = path.join(__dirname + '../../../frontend/temp/partials');

// Staic Directory Middleware
app.use('/public', express.static(staticPath));

// View Engine
app.set('view engine', 'hbs');

// Set view engine path
app.set('views', [
    adminViewsPath,
    userViewsPath,
    commonViewsPath
]);

// Partials
hbs.registerPartials(partialsPath);

// Routes
app.use(route);

// Server
app.listen(port, () => {
    console.log(`Server has started at port ${port}`);
})

