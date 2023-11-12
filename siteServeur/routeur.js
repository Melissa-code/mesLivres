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

/* :nom parametre, info envoyée à la vue avec un objet JSON { nom: request.params.nom } */ 
router.get("/livres/:nom", (request, response)=> {
    //console.log(request.params.nom)
    response.render('livres/livre.html.twig', { nom:request.params.nom }); 
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
