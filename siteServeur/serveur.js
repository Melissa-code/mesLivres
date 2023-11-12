const express = require('express'); // Get the module express
let server = express(); 
const morgan = require('morgan'); 
const router = require('./routeur'); 
const mongoose = require('mongoose');

/* https://mongoosejs.com/docs/ */

// Connection to the DB 
//mongoose.connect(
   // "mongodb://localhost/livres_db", 
    //{useNewUrlParser: true, useUnifiedTopology: true}
//);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/livres_db');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/livres_db');` if your database has auth enabled
}

// Create the schema (types)
const livreSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    nom: String, 
    auteur: String,
    pages: Number
}); 

// Association between the schema and the DB 
const livreModel = mongoose.model("Livre", livreSchema); 

// Get the books (livres : result of the request)
livreModel.find()
    .exec()
    .then(livres => {
      console.log(livres)
    })
    .catch(); 

// Define public folder on the server 
server.use(express.static('public'));
// middleware
server.use(morgan('dev'));
server.use("/", router); // for URLs that begin by /

server.listen(3000);  