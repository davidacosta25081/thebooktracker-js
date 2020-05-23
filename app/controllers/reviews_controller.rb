class ReviewsController < ApplicationController
  
  

  def index
    reviews = Review.all
    render json: reviews
  end

  def show
    review = Review.find(params[:id])
    render json: review
  end

  def new
    @review = Review.new
  end

  def edit
    @review = Review.find(params[:id])
  end

  def create
    @review = Review.create(review_params)
     
       render json: @review, status:200
     
       
     
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      redirect_to @review
    else
      render :edit
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    flash[:danger] = "Review Deleted"
    
  end

  
  private
    
    def review_params
      params.require(:review).permit(:content, :book_id, :user_email, :user_id)
    end

    
    

end

