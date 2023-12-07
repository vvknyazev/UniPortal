const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

// Enable CORS before defining routes
app.use(cors());
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.use(express.urlencoded({ extended: true }));

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        app.listen(5000, (e) => {
            if (e) console.log(e);
            console.log('Server has been started on port: ' + 5000);
        });
    } catch (e) {
        console.log(e);
    }
}

start();