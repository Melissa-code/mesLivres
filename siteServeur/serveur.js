let express = require('express'); // Get the module express
let server = express(); 
let morgan = require('morgan'); 
//middleware
server.use(morgan('dev')); 

server.listen(3000); 

server.get("/", (request, response)=> {
    response.end('Accueil'); 

})
server.get("/contact", (request, response)=> {
    response.end('Contact'); 
})
