let express = require('express'); 
let router = express.Router(); 
const twig = require('twig'); 

router.get("/", (request, response)=> {
    //response.end('Accueil'); 
    response.render('home.html.twig'); 
})

router.get("/livres", (request, response)=> {
    response.render('livres/liste.html.twig'); 
})

/* Page d'erreur à la fin des routes */ 
router.use( (request, response, suite)=> {
    const error = new Error("Page introuvable");
    error.status = 404; 
    suite(error);
})

router.use( (error, request, response)=> {
    response.status( error.status || 500);
    response.end(error.message); 
})

module.exports = router;
