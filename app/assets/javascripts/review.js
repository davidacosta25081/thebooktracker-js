class Review {
	constructor(content){
	this.content = content 
	
}


createReview(e) {
  
  let userId = document.cookie.toString().slice(9,1000);
  const review = {
    'content': event.target.content.value,
    'user_email': 'myemail@myemail.com',
    'book_id': event.target.bookId.value,
    'user_id': `${userId}`
  }
  fetch('http://localhost:3000/reviews', {
    method: 'POST',
    body: JSON.stringify({ review }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
    .then(review => console.log(review))
    
    
 
}

showReviews(e) {
  event.preventDefault();
  
  let userId = parseInt(document.cookie.slice(9,1000),10)  
  let id = event.target.dataset.id
  let main = document.getElementById('reviews');
  main.innerHTML = '';
  
  fetch('http://localhost:3000/reviews')
  .then(resp => resp.json())
  .then(reviews => {
    console.log(reviews) })

    /*let myReviewsBag = reviews.filter(review => review.book.id === id && review.user.id === userId) 
    let reviewsBag = reviews.filter(review => review.book.id === id && review.user.id != userId)
    main.innerHTML = '<ul>'
    main.innerHTML += myReviewsBag.map(review =>   
       `${review.content}&nbsp;`)
      //<button onclick="deleteReview(${review.id},${id})">Delete</button> </li>`).join('') 
      
    main.innerHTML += reviewsBag.map(review =>  
      `<li> ${review.content} by : ${review.user.email}  </li>`).join('')
    main.innerHTML += '<ul>';
  
  })

*/

}







}








