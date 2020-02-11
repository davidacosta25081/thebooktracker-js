const BASE_URL = 'http://localhost:3000'


function displayCreateForm(){
  clearForm();
  let bookFormDiv = document.getElementById('books-form');
  let html =  `
    <form onsubmit="createBook(); return false;">
      <label>Title: </label><br/>
      <input type="text" id="title"><br/>
      <label>Author first name: </label><br/>
      <input type="text" id="author_first_name"><br/>
      <label>Author last name: </label><br/>
      <input type="text" id="author_last_name"><br/>
      
      <input type="submit" value="Create Book">
    </form>
  `
  bookFormDiv.innerHTML = html;
}


function getBooks() {
  clearForm();
  let main = document.getElementById('main');
  main.innerHTML = '<ul>';
  fetch(BASE_URL + '/books')
  .then(resp => resp.json())
  .then(books => {
    main.innerHTML += books.map(book => `<li><a href="#" data-id="${book.id}">${book.title}</a> </li>`).join('')
    main.innerHTML += '</ul>'
    
    attachClickToBooksLinks();
    
  })
}

function attachClickToBooksLinks() {
  let books = document.querySelectorAll('li a');
  for (let i = 0; i < books.length; i++) {
    books[i].addEventListener('click', displayBook)
  }
}

window.addEventListener('load', function(){
  attachClickToBooksLinks();
})


function clearForm(){
  let mainForm = document.getElementById('main');
  mainForm.innerHTML = '';
  let bookFormDiv = document.getElementById('books-form');
  bookFormDiv.innerHTML = '';
  let commentsForm = document.getElementById('comments');
  commentsForm.innerHTML = '';

}



function displayBook(e) {
  e.preventDefault();
  clearForm();
  let id = this.dataset.id;
  let main = document.getElementById('main');
  main.innerHTML = '';

  fetch(BASE_URL + '/books/' + id + '.json')
    .then(resp => resp.json())
    .then(book => {
      console.log(book);
      main.innerHTML += `<h3>Book Title: ${book.title}</h3>`
      main.innerHTML += `<h3>Author: ${book.author_first_name}  ${book.author_last_name}<br><br></h3>`
      main.innerHTML += `<button onclick="myFunction()">Create Comment</button></h3>`
      main.innerHTML += `&nbsp;&nbsp;&nbsp;<button onclick="myFunction2()">View Comments</button></h3>`
    })
}

function myFunction() {
  document.getElementById("comments").innerHTML = "Please type your comment";
}

function myFunction2() {
  document.getElementById("comments").innerHTML = "view comments";
}


function createBook() {
  const book = {
    title: document.getElementById('title').value,
    author_first_name: document.getElementById('author_first_name').value,
    author_last_name: document.getElementById('author_last_name').value
    
  }
  fetch(BASE_URL + '/books', {
    method: 'POST',
    body: JSON.stringify({ book }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
  
    
    let main = document.getElementById('main');
    main.innerHTML += `<h3>Your Book has been added!</h3>`
    let bookFormDiv = document.getElementById('books-form');
  bookFormDiv.innerHTML = '';
 
}








