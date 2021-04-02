'use strict';

require('dotenv').config()
const server = require('./src/server.js')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
    .then(() => {
        server.start(process.env.PORT);
    })
    .catch((error)=>{
        console.log('__CONNECTION ERROR__',error.message);
    })