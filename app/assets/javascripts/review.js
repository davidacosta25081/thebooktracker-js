class Review {
	constructor(content,bookId){
	this.content = content 
	this.bookId = bookId
	 this.createReview();    
    
}



createReview() {
  
  
  let userId = document.cookie.toString().slice(9,1000);
  let bookFormDiv2 = document.getElementById('review form');
  bookFormDiv2 = '';
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
     
   
/*

   let buttonMessage = document.getElementById('main');
   main.innerHTML = '';
   button.innerHTML = "Add more books";
   buttonMessage.appendChild(button)
   button.addEventListener('click', () => {   
   new Book().getLastBookId()
   
   
   }) */
  


})


}



}








/*
showReviews() {
  event.preventDefault();
  
    
  let id = e.target.dataset.id
  let main = document.getElementById('main');
  main.innerHTML = '';
   
  fetch('http://localhost:3000/books/' + id )
  
  .then(resp => resp.json())
  .then(book => {
    let showReviews = document.getElementById('main');
    showReviews.innerHTML = book.reviews.map(review =>   showReviews.innerHTML = `${review.content}` )

    console.log(book.reviews)
    //for (let i = 0; i < book.reviews.length; i++) {
  
   //main.innerHTML += `<h3>${book.reviews[i].content}  <br> by ${book.users[i].email}</h3>`

  

*/


    

    //let myReviewsBag = reviews.filter(review => review.book.id === id && review.user.id === userId) 
    //let reviewsBag = reviews.filter(review => review.book.id === id && review.user.id != userId)
    
    //main.innerHTML = '<ul>'
    //main.innerHTML += myReviewsBag.map(review =>   
      //vi `<h1>${review.content}</h1>`)
      
      //<button onclick="deleteReview(${review.id},${id})">Delete</button> </li>`).join('') 
      
    //main.innerHTML += reviewsBag.map(review =>  
     // `<li> ${review.content} by : ${review.user.email}  </li>`).join('')
   // main.innerHTML += '<ul>';
  //console.log(myReviewsBag)
  //console.log(reviewsBag)
  //})


















