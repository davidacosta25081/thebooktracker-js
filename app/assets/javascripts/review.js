class Review {
	
  constructor(content,bookId){
	  this.content = content 
	  this.bookId = bookId
	  this.createReview();    
  }

  createReview() {
    let userId = document.cookie.toString().slice(9,1000);
    let reviewsShow = document.getElementById('reviews');
    reviewsShow.innerHTML = '';
  
    const review = {
      'content': this.content,
      'book_id': this.bookId,
      'user_id': userId 
    }
 
    fetch('http://localhost:3000/reviews/' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ review }),
    })
    .then(resp => resp.json())
    .then(review => { console.log("Creating Review") })
    .then(() => {
      let successMessage = document.getElementById('review form');
      successMessage.innerHTML = '';
      successMessage.innerHTML = '<h3>Your review has been added!</h3>';
    })
    // Add button to show reviews !!! Review.showReviews();
  }

  static reviewForm(id) {
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
    
    let buttonForm = document.querySelector('.reviewBtn')
    buttonForm.innerHTML = 'Add Review'
    buttonForm.addEventListener('click' , e => { Review.reviewAdapter(e) })
    
    let buttonShowReviews = document.createElement('Button');
    buttonShowReviews.innerHTML = 'Show Reviews';
    buttonShowReviews.classList.add("reviewBtn");
    buttonShowReviews.setAttribute('data-id' , id)
    buttonShowReviews.addEventListener('click' , Review.showReviews);
    reviewCard.appendChild(buttonShowReviews);
  }



  static reviewAdapter(e) {
    e.preventDefault();
    let content = document.getElementById('content').value;
    let bookId = document.getElementById('bookId').value;
    new Review(content, bookId);
  }


  static showReviews() {
    debugger
    let id = this.dataset.id
    let userId = document.cookie.toString().slice(9,1000);
    let reviewsShow = document.getElementById('reviews');
    reviewsShow.innerHTML = '';
    fetch('http://localhost:3000/books/' + id )
    .then(resp => resp.json())
    .then(book => {
      for (let i = 0; i < book.reviews.length; i++) {
        reviewsShow.innerHTML += `<h3>${book.reviews[i].content}  <br> by ${book.users[i].email}</h3>`
        if (book.users[i].id == userId) {
          let buttonDelete = document.createElement('Button');
          buttonDelete.innerHTML = 'Delete';
          reviewsShow.appendChild(buttonDelete); 
        }
      }
    })
  }
    
}















