const express = require('express'); // Get the module express
let server = express(); 
const morgan = require('morgan'); 
const router = require('./routeur'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
// session message flash
const session = require('express-session'); 


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
// Traite URL et info user postées 
server.use(bodyParser.urlencoded({extended:false})); 
// Session flash
server.set('trust proxy', 1);
server.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // life of the cookie
}))

//local (in the local variables)
server.use( (request, response, next) => {
  response.locals.message = request.session.message;
  delete request.session.message; 
  next();
})

// Manage routes & redirection
server.use("/", router); // for URLs that begin by /

server.listen(3000);  