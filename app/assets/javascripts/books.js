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

  fetch(BASE_URL + '/books/' + id)
    .then(resp => resp.json())
    .then(book => {
      console.log(book);
      main.innerHTML += `<h3>Book Title: ${book.title}</h3>`
      main.innerHTML += `<h3>Author: ${book.author_first_name}  ${book.author_last_name}<br><br></h3>`
      main.innerHTML += `<button onclick="writeReview(${id})">Write Review</button></h3>`
      main.innerHTML += `&nbsp;&nbsp;&nbsp;<button onclick="showReviews(${id})">View Reviews</button></h3>`
      
    })
}

function writeReview(id) {
  let commentForm = document.getElementById("comments");
  let html2 =  `<form onsubmit="createReview(${id}); return false;"><br>
  <label>Your Email: </label><br/>
  <input type="text" id="email"><br/>
  Review:<br>
  <textarea rows="5" cols="30" id="content">
  </textarea><br><br>
  <input type="submit" value="Submit">
</form> `;
  commentForm.innerHTML = html2;
}



function createReview(id) {
  let userId = document.cookie.toString().slice(9,1000);
  const review = {
    content: document.getElementById('content').value,
    user_email: document.getElementById('email').value,
    book_id: `${id}`,
    user_id: `${userId}`
  }
  fetch(BASE_URL + '/reviews', {
    method: 'POST',
    body: JSON.stringify({ review }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
  
    
    let main = document.getElementById('main');
    main.innerHTML += `<h3>Your Review has been added!</h3>`
    let reviewFormDiv = document.getElementById('comments');
  reviewFormDiv.innerHTML = '';
 
}


function showReviews(id) {
  
  let userId = parseInt(document.cookie.slice(9,1000),10)
  let main = document.getElementById('comments');
  main.innerHTML = '<ul>';
  fetch(BASE_URL + '/reviews')
  .then(resp => resp.json())
  .then(reviews => {
    let myReviewsBag = reviews.filter(review => review.book.id === id && review.user.id === userId) 
    let reviewsBag = reviews.filter(review => review.book.id === id && review.user.id != userId)
    
    main.innerHTML += myReviewsBag.map(review =>  
      `<li> ${review.content}&nbsp;
      <button onclick="deleteReview(${id})">Delete</button>&nbsp;
      <button onclick="editReview(${id})">Edit</button> </li>`).join('') 
    
    main.innerHTML += reviewsBag.map(review =>  
      `<li> ${review.content} 'by :' ${review.user.email}  </li>`).join('')
    main.innerHTML += '<ul>';
  


     })
    
    


}



function deleteReview(id) {

}



function editReview(id) {


}











