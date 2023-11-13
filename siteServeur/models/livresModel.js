const mongoose = require('mongoose');

// Create the schema (types)
const livreSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    nom: String, 
    auteur: String,
    pages: Number,
    description: String
}); 

// Association between the schema and the DB 
module.exports = mongoose.model("Livre", livreSchema); 