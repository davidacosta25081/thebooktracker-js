class BooksController < ApplicationController

def index
    books = Book.all
    render json: books
    
  end


  def new
    @book = Book.new
    @book.reviews.build
  end

  
  def create
    @book = Book.create(book_params)
    @book.reviews.last.user = current_user
    if @book.save
       render json: @book
    else
      render :new
    end
  end

  

  def show
    @book = Book.find(params[:id])
  end


  def edit 
	@book = Book.find(params[:id])
  end 

  def update 
  	@book = Book.find(params[:id])
  	@book.update(book_params)
  	redirect_to book_path(@book)
  end 	


 def destroy
    @book = Book.find(params[:id])
    @book.destroy
    flash[:danger] = "book Deleted"
    redirect_to user_path(current_user.id)
  end




private
  def book_params
    params.require(:book).permit(:title, :author_first_name, :author_last_name, :genre_name, reviews_attributes: [:content])
  end





end
