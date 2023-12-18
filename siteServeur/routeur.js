let express = require('express'); 
let router = express.Router(); 
const twig = require('twig'); 
const mongoose = require('mongoose');
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
 * Add a book
 */
router.post("/livres", (request, response) => {
    const livre = new livresModel({
        _id: new mongoose.Types.ObjectId(), 
        nom: request.body.title, 
        auteur: request.body.author, 
        pages: request.body.nbPages,
        description: request.body.desc
    }); 
    livre.save()
    .then(result => {
        response.redirect('/livres'); 
    })
    .catch(error => {
        console.log(error);
    })
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

/**
 * Delete a book 
 * deleteOne() or deleteMany() != remove()
 */
router.post("/livres/delete/:id", (request, response)=> {
    livresModel.deleteOne({_id:request.params.id})
   .exec()
   .then(result => {
        response.redirect('/livres'); 
   }) 
   .catch(error => {
        console.log(error);
    }); 
}); 

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
