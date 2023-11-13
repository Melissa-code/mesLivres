let express = require('express'); 
let router = express.Router(); 
const twig = require('twig'); 
const livresModel = require('./models/livresModel'); 

/**
 * Route: display the home page
 * return view 
 */
router.get("/", (request, response)=> {
    //response.end('Accueil'); 
    response.render('home.html.twig'); 
})

/**
 * Route: display the liste of the books 
 * (variable livres : result of the request)
 * return view with listeLivres
 */
router.get("/livres", (request, response)=> {
     livresModel.find()
        .exec()
        .then(livres => {
            //console.log(livres)
            response.render('livres/liste.html.twig', {listeLivres: livres}); 
        })
     .catch(); 
})

/**
 * Route: Display a book with information 
 * return view with livre
 */
/* :nom parametre, info envoyée à la vue avec un objet JSON { nom: request.params.nom } */ 
router.get("/livres/:id", (request, response)=> {
    //console.log(request.params.id)
    //response.render('livres/livre.html.twig', { nom:request.params.id }); 
    livresModel.findById(request.params.id)
    .exec()
    .then(unLivre => {
        response.render('livres/livre.html.twig', {livre: unLivre}); 
    })
    .catch(error => {
        console.log(error);
    }); 
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
