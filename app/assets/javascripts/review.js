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
  let successMessage = document.getElementById('review form');
    successMessage.innerHTML = '';
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
      let success = document.createElement('div');
      success.classList.add('alert');
      success.classList.add('alert-success');
      success.innerHTML = `<strong> Submission Succesful !</strong>`;
      reviewsShow.appendChild(success);
      let buttonShowReviews = document.createElement('Button');
      buttonShowReviews.innerHTML = 'Show Reviews';
      buttonShowReviews.classList.add("reviewBtn");
      buttonShowReviews.setAttribute('data-id' , this.bookId)
      buttonShowReviews.addEventListener('click' , Review.showReviews);
      
      successMessage.appendChild(buttonShowReviews);
    
    })
    
    
  }

  static reviewForm(id) {
    
    let reviewCard = document.getElementById('review form');
    reviewCard.innerHTML = '';
    let reviewHtml =  `
      <br/><form id="review form2">
      <textarea id="styled" class="form-control"  name="content" placeholder="Review Content"/></textarea>
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
    buttonShowReviews.classList.add('btn');
    buttonShowReviews.setAttribute('data-id' , id)
    buttonShowReviews.addEventListener('click' , Review.showReviews);
    reviewCard.appendChild(buttonShowReviews);
  }



  static reviewAdapter(e) {
    e.preventDefault();
    let content = document.getElementById('styled').value;
    let bookId = document.getElementById('bookId').value;
    new Review(content, bookId);
  }


  static showReviews() {
    let id = this.dataset.id
    
    let userId = document.cookie.toString().slice(9,1000);
    let reviewsShow = document.getElementById('reviews');
    reviewsShow.innerHTML = '';
    fetch('http://localhost:3000/books/' + id )
    .then(resp => resp.json())
    .then(book => {
      for (let i = 0; i < book.reviews.length; i++) {
        reviewsShow.innerHTML +=  `<ul><b>Review :</b></br></br>${book.reviews[i].content}<br/><br/><b> by : ${book.users[i].email}</b><br/></ul>`
        if (book.users[i].id == userId) {
          let buttonDelete = document.createElement('Button');
          buttonDelete.classList.add('delete-btn');
          let reviewId = book.reviews[i].id;
          buttonDelete.setAttribute('data-id',reviewId);
          buttonDelete.innerHTML = 'Delete';
          reviewsShow.appendChild(buttonDelete);
        }
      }     
       let buttons = document.querySelectorAll('.delete-btn');
       for ( let i = 0; i < buttons.length; i++){
         buttons[i].addEventListener('click', Review.delete);
        }   
        
      
      
    })
  
  }
    



  static delete() {

    let id = this.dataset.id;
    fetch('http://localhost:3000/reviews/' + id, {
      method: 'delete'
    })
    let reviewDeleted = document.getElementById('reviews');
    reviewDeleted.innerHTML = " ";
    let success = document.createElement('div');
    success.classList.add('alert');
    success.classList.add('alert-success');
    success.innerHTML = `<strong> Your Review has been deleted.</strong>`;
    reviewDeleted.appendChild(success);
  }

}















