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
      <label>Review: </label><br/>
      <input type="text" id="review"><br/><br/>
      <input type="submit" value="Create Book">
    </form>
  `
  bookFormDiv.innerHTML = html;
}


function getBooks() {
  
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
      main.innerHTML += `<h3>${book.id}</h3>`;
      main.innerHTML += `<h3>${book.title}</h3>`
    })
}







