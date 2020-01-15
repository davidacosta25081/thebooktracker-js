const BASE_URL = 'http://localhost:3000'


function displayCreateForm(){
  let bookFormDiv = document.getElementById('books-form');
  let html =  `
    <form onsubmit="createTodo(); return false;">
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
  todoFormDiv.innerHTML = html;
}


function getBooks() {
  
  let main = document.getElementById('main');
  main.innerHTML = '<ul>';
  fetch(BASE_URL + '/books')
  .then(resp => resp.json())
  .then(books => {
    main.innerHTML += books.map(book => `<li><a href="#" data-id="${book.id}">${book.title}</a> </li>`)
    main.innerHTML += '</ul>'

    
  })
}
