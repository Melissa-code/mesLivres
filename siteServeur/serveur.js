const express = require('express'); // Get the module express
let server = express(); 
const morgan = require('morgan'); 
const router = require('./routeur'); 
const mongoose = require('mongoose');

/* https://mongoosejs.com/docs/ */
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/livres_db');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/livres_db');` if your database has auth enabled
}

// Get the model (livresModel.js)
const livresModel = require('./models/livresModel'); 

// Define public folder on the server 
server.use(express.static('public'));
// middleware
server.use(morgan('dev'));
server.use("/", router); // for URLs that begin by /
server.listen(3000);  