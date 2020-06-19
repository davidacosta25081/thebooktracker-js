class Book {
  
  constructor(title, firstname, lastname) {
    this.title = title;
    this.authorName = firstname;
    this.authorLast = lastname;
    this.bookId;
    this.clearDivs();
  } 


  
  clearDivs () {
    this.bookForm = document.getElementById('book-form');
    this.bookForm.innerHTML = "";
    this.reviewForm = document.getElementById('review form');
    this.reviewForm.innerHTML = "";
    this.reviews = document.getElementById('reviews');
    this.reviews.innerHTML = "";
  }


  displayCreateForm(){
    let bookHtml =  `
      <br/><br/><form id="book-form">
          <input type="text" class="form-control" required name="title" placeholder="Book's title"/>
          <br/>
          <input type="text" class="form-control" required name="firstName" placeholder="Author's First Name"/>
          <br/>
          <input type="text" class="form-control" required name="lastName" placeholder="Author's Last Name"/>
          <br/>
          <textarea id="styled" class="form-control"  required name="content" placeholder="  Review Content"/></textarea>
          <br/>
          <input type="hidden" id="bookId" value=" "/>
          <br/>
          <input type="submit" class="btn" value="Submit"/>
        </form>`
    this.bookForm.innerHTML = bookHtml;
    document.getElementById('bookId').value = this.bookId 
    this.bookForm.addEventListener('submit' , this.createBook);
  }

  createBook(e) {
    e.preventDefault();
    const book = new Book(
      e.target.title.value,
      e.target.firstName.value,
      e.target.lastName.value,
    )
    fetch('http://localhost:3000/books/' , {
      method: 'POST',
      body: JSON.stringify({ book }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => resp.json())
    .then(book =>  {
      
      let bookCard = document.getElementById('book-form');
      bookCard.innerHTML = '';
      bookCard.innerHTML += `</br></br><h4><b>The Book Title :</b>${book.title} </br><b>Author's First Name :</b> ${book.authorName} </br><b>Author's Last Name :</b> ${book.authorLast}</h4>` 
      let content = e.target.content.value;
      let bookId = book.id;
      new Review(content,bookId);
    })
  }
 
  getBooks() {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => {
     this.bookForm.innerHTML += books.reverse().map(book => `<ul><a href="#" data-id="${book.id}">${book.title}</a> </ul>`).join('')
    })  
    .then(() => this.attachClickToBooksLinks());
  }

  attachClickToBooksLinks() {
    let books = document.querySelectorAll('ul a');
    for (let i = 0; i < books.length; i++) {
    books[i].addEventListener('click', this.displayBook);
    }
  }

   displayBook(e) {
     e.preventDefault();
     let id = this.dataset.id;
     let bookCard = document.getElementById('book-form');
     bookCard.innerHTML = ' ';
     fetch('http://localhost:3000/books/' + id)
     .then(resp => resp.json())
     .then(book =>   { 
       const {id, title, authorName, authorLast} = book; 
       bookCard.innerHTML = `<ul></br><h4><b>The Book Title : </b> ${book.title} </br><b>Author's First Name :</b> ${book.authorName} </br><b>Author's Last Name :</b> ${book.authorLast}</h4></ul>`
       return id;
      }).then((id)=> {Review.reviewForm(id) } )  
    }

  getLastBookId(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then (books =>  {
      if (books.length !== 0) {
        return books[books.length - 1].id 
      }else {
        return books.length
      }
    })
    .then (bookId => { 
      this.bookId = bookId + 1
      this.displayCreateForm(); 
    });
  } 
 

}










