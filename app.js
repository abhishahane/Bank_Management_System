require('dotenv').config();

const port = process.env.PORT;
const express = require('express');
require('./database/connection');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');
const swagger = require('./swagger/swagger');

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// port-setting
app.listen(port, console.log('app is running...'));

// routes
app.use(authRoutes);
app.use(loanRoutes);
app.use(swagger);

module.exports = app;
