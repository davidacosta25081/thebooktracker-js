class Book {
  
  constructor(title, firstname, lastname) {
    this.title = title;
    this.authorName = firstname;
    this.authorLast = lastname;
    this.bookId;
    this.content;
    
    
  } 


  displayCreateForm(){
    
    let bookFormDiv = document.getElementById('book form');
    bookFormDiv.innerHTML = "";
    let successMessage = document.getElementById('review form');
      successMessage.innerHTML = '';
    let buttonDiv = document.getElementById('main');
    buttonDiv = "";
    
    let bookHtml =  `
    <br/><form id="book form">
          <input type="text" required name="title" placeholder="Book's title"/>
          <br/>
          <input type="text" required name="firstName" placeholder="Author's First Name"/>
          <br/>
          <input type="text" required name="lastName" placeholder="Author's Last Name"/>
          <br/>
          <input type="text" required name="content" placeholder="Review Content"/>
          <br/>
          <input type="hidden" id="bookId" value=" "/>
          <input type="submit" class='book-btn' value="Submit Book"/>
        </form>`
    bookFormDiv.innerHTML = bookHtml;
    
    document.getElementById('bookId').value = this.bookId 
    
    bookFormDiv.addEventListener('submit' , this.createBook);
    //bookFormDiv.addEventListener('submit' , e => Book.createReview(e));




}

  createBook(e) {
    
    
    e.preventDefault();
    
    

    const book = {
      'title': e.target.title.value,
      'authorName': e.target.firstName.value,
      'authorLast': e.target.lastName.value,
    }
    
    fetch('http://localhost:3000/books/' , {
      method: 'POST',
      body: JSON.stringify({ book }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => resp.json())
    .then(book =>  {
      
      let successMessage = document.getElementById('book form');
      successMessage.innerHTML = '';
      successMessage.innerHTML = '<h3>Your Book has been added!</h3>';
      successMessage.innerHTML += `${book.title}  <br/> ${book.authorName} <br/> ${book.authorLast}` 
      
      let content = e.target.content.value;
      let bookId = book.id;
      
      //let content = this.content
      //let bookId = this.bookId
      new Review(content,bookId);
      
      })//.then(()=> { 
        //debugger 


        //  new Review().createReview();

        
//})    



  }
 
  
  

  
  getBooks() {
    let bookFormDiv1 = document.getElementById('book form');
    bookFormDiv1.innerHTML = '';
    let main = document.getElementById('book form');
    main.classList.add('book')
  
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => {
      main.innerHTML += books.reverse().map(book => `<ul><a href="#" data-id="${book.id}">${book.title}</a> </ul>`).join('')
    })  
    .then(() => this.attachClickToBooksLinks());
    
  }


  
  attachClickToBooksLinks() {
    
    let books = document.querySelectorAll('ul a');
    for (let i = 0; i < books.length; i++) {
      books[i].addEventListener('click', this.displayBook)
    
    }
  }

 
  

    displayBook(e) {
    e.preventDefault();
    let id = this.dataset.id;
    let bookCard = document.getElementById('book form');
    
    
    bookCard.innerHTML = ' ';
    fetch('http://localhost:3000/books/' + id)
    .then(resp => resp.json())
    .then(book =>   { 
    

      bookCard.innerHTML = `${book.title} <br> ${book.authorName} <br> ${book.authorLast}`
    return book.id
    
    }).then((id)=> {new Book().reviewForm(id) } )  
  
  
      }

      reviewForm(id) {
      
      let reviewCard = document.getElementById('review form');
    reviewCard.innerHTML = '';

      let reviewHtml =  `
         <br/><form id="review form2">
          <input type="text" required id="content" placeholder="Review Content"/>
          <br/>
          <input type="hidden" id="bookId" value=" "/>
          <button class="reviewBtn" type="submit">
        </form>`
     
    reviewCard.innerHTML = reviewHtml;
    document.getElementById('bookId').value = id
    
    let botonsito = document.querySelector('.reviewBtn')
    botonsito.innerHTML = 'Add Review'
    botonsito.addEventListener('click' , e => { Book.reviewAdapter(e) })
    
    

    /*let showReviews = document.getElementById('main');
    showReviews.innerHTML = '';
    
    let button = document.createElement("button");
    button.setAttribute('data-id' , id)
    button.innerHTML = "Mostra Reviews nea";
    button.addEventListener('click', e => Review.showReviews(e));
    showReviews.appendChild(button);
   */
   
 

} 


  
  
 static reviewAdapter(e) {

  e.preventDefault();
  let content = document.getElementById('content').value;
  let bookId = document.getElementById('bookId').value;
  
  new Review(content, bookId);


 }




  

















  getLastBookId(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then (books =>  {
       
      if (books.length !== 0) {
         return books[books.length - 1].id 
      } else {
           return books.length
      }
    })
    .then (bookId => { this.bookId = bookId + 1
      
      console.log(this.bookId);
      
      this.displayCreateForm(); 
    });
  } 
 

 







}














/*
clearDivs(){
  let main = document.getElementById('main');
  main.innerHTML = ' ';
  let bookFormDiv = document.getElementById('book form');
  bookFormDiv.innerHTML = '';
  let commentsForm = document.getElementById('comments');
  commentsForm.innerHTML = '';

}



*/



  /*
  createBook() {
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



  getBooks() {
  
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

  attachClickToBooksLinks() {
  let books = document.querySelectorAll('li a');
  for (let i = 0; i < books.length; i++) {
    books[i].addEventListener('click', displayBook)
  }
}



  



  displayBook(e) {
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






  writeReview(id) {
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



  createReview(id) {
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


  showReviews(id) {
  
  let userId = parseInt(document.cookie.slice(9,1000),10)
  let main = document.getElementById('comments');
  main.innerHTML = '';
  main.innerHTML = '<ul>';
  fetch(BASE_URL + '/reviews')
  .then(resp => resp.json())
  .then(reviews => {
    let myReviewsBag = reviews.filter(review => review.book.id === id && review.user.id === userId) 
    let reviewsBag = reviews.filter(review => review.book.id === id && review.user.id != userId)
    
    main.innerHTML += myReviewsBag.map(review =>   
      `<li> ${review.content}&nbsp;
      <button onclick="deleteReview(${review.id},${id})">Delete</button> </li>`).join('') 
      
    main.innerHTML += reviewsBag.map(review =>  
      `<li> ${review.content} by : ${review.user.email}  </li>`).join('')
    main.innerHTML += '<ul>';
  
  })
}



deleteReview(reviewId, id) {
console.log(reviewId)
console.log(typeof reviewId)
fetch(BASE_URL + '/reviews/' + reviewId, {
  method: 'DELETE',
})
clearForm();
let message = document.getElementById('comments');
message.innerHTML = `<h3>Your review has been deleted</h3>`
message.innerHTML +=`<button onclick="showReviews(${id})"> Back </button>`

}


}

*/











