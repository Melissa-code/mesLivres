let express = require('express'); // Get the module express
let server = express(); 
let morgan = require('morgan'); 
let router = require('./routeur'); 
//middleware
server.use(morgan('dev')); 
server.use("/", router); // for URLs that begin by /

server.listen(3000);