class BooksController < ApplicationController

def index
    books = Book.all
    render json: books
end


  def new
    @book = Book.new
    
  end

  
  def create
    book = Book.create(book_params)
    
   
       render json: book
   
     
  end

  

  def show
    book = Book.find(params[:id])
    render json: book
  end


  def edit 
	@book = Book.find(params[:id])
  end 

  def update 
  	@book = Book.find(params[:id])
  	@book.update(book_params)
  	
  end 	


 def destroy
    @book = Book.find(params[:id])
    @book.destroy
    flash[:danger] = "book Deleted"
    
  end




private
  def book_params
    params.require(:book).permit(:title, :authorName, :authorLast)
  end





end
