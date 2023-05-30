// including required packages
const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const port = process.env.PS_PORT;
const db = require('./configs/db_connection');

const app = express(); // getting instance of express server into app constant

// encoding decoding middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// setting up different routing file
app.use('/', require('./routes/index'));

// server is listening at given port
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`server is up and running at port ${port}`);

})