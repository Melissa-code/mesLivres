const table = document.querySelector('#table-books'); 
const formAddBook = document.querySelector('#addFormBook');
const formUpdateBook = document.querySelector('#updateFormBook');
let book1 = {
    nom : 'Livre 1',
    auteur : 'Auteur 1',
    nbPages : 100
}
let book2 = {
    nom : 'Livre 2',
    auteur : 'Auteur 2',
    nbPages : 200
}
let book3 = {
    nom : 'Livre 3',
    auteur : 'Auteur 3',
    nbPages : 300
}
let book4 = {
    nom : 'Livre 4',
    auteur : 'Auteur 4',
    nbPages : 400
}
let arrayBooks = [book1, book2, book3, book4];


/**
 * Display the list of the books 
 */
function displayBooks() {
    const bookTable = document.querySelector('#tBodyBooks')
    let books = ""; 
    for(let i = 0; i <= arrayBooks.length -1; i++) {
        books += `
            <tr class="table-primary">
            <td>${arrayBooks[i].nom}</td>
            <td>${arrayBooks[i].auteur}</td>
            <td>${arrayBooks[i].nbPages}</td>
            <td>
                <button type="button" class="btn btn-warning" onClick="displayFormToUpdateBook(${i})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" class="btn btn-danger" onClick="deleteBook(${i})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
        `;
        bookTable.innerHTML = books; 
    }
}

/**
 * Display the form which is hidden by default 
 */
function addForm() {
    formUpdateBook.className = "d-none";
    formAddBook.removeAttribute('class');
}  

/*************************************************************
 * Create a book 
/*************************************************************/

/**
 * Create a new book 
 * @param {*} title 
 * @param {*} author 
 * @param {*} nbPages 
 */
function addBook(title, author, nbPages) {
    let book = {
        nom : title,
        auteur : author,
        nbPages : nbPages
    }
    arrayBooks.push(book); 
    displayBooks(); 
}

/**
 * Event click to add a new book, clear the form and hide the form
 */
document.querySelector('#validationFormAddBook').addEventListener('click', (e)=> {
    e.preventDefault(); //refresh the page
    let title = document.querySelector('#addFormBook #title').value; 
    let author = document.querySelector('#addFormBook #author').value; 
    let nbPages = document.querySelector('#addFormBook #nbPages').value; 
    addBook(title, author, nbPages); 
    formAddBook.reset();
    formAddBook.className = "d-none";
})

/************************************************************
 * Delete a book 
/************************************************************/
 
/**
 * Delete a book
 * @param {*} indexBook 
 */
function deleteBook(indexBook) {
    if(confirm("Voulez-vous vraiment supprimer ce livre?")) {
        arrayBooks.splice(indexBook, 1); //location & number of element
        displayBooks();
        alert("Suppression effectuée."); 
    } else {
        alert("Suppression annulée."); 
    }
}

/************************************************************
 * Update a book 
/************************************************************/

/**
 * Display the form which is hidden by default 
 */
function displayFormToUpdateBook(indexBook) {
    formAddBook.className = "d-none";
    formUpdateBook.removeAttribute('class');
    // Display the saved values in the inputs
    document.querySelector('#updateFormBook #title').value = arrayBooks[indexBook].nom; 
    document.querySelector('#updateFormBook #author').value = arrayBooks[indexBook].auteur; 
    document.querySelector('#updateFormBook #nbPages').value = arrayBooks[indexBook].nbPages; 
    document.querySelector('#updateFormBook #index').value = indexBook; 
}

/**
 * Event click to update a book, clear the form and hide the form
 */
document.querySelector('#validationFormUpdateBook').addEventListener('click', (e)=> {
    e.preventDefault(); 
    let title = document.querySelector('#updateFormBook #title').value; 
    let author = document.querySelector('#updateFormBook #author').value;  
    let nbPages = document.querySelector('#updateFormBook #nbPages').value; 
    let indexBook = document.querySelector('#updateFormBook #index').value; 
    arrayBooks[indexBook].nom = title; 
    arrayBooks[indexBook].auteur = author; 
    arrayBooks[indexBook].nbPages = nbPages; 
    displayBooks(); 
    formUpdateBook.className = "d-none";
})

displayBooks(); 

