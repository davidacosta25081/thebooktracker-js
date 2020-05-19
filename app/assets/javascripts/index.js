document.addEventListener('DOMContentLoaded', event => {
  
  let button1 = document.getElementById('button1')
  button1.addEventListener('click' , () => {
  	
  	book1 = new Book().getLastBookId();
  })

  let button2 = document.getElementById('button2')
  button2.addEventListener('click' , () => {
  	
  	book2 = new Book().getBooks();
    
  })














})
