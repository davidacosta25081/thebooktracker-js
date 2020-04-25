class ReviewsController < ApplicationController
  
  

  def index
    reviews = Review.all
    render json: reviews
  end

  def show
    @review = Review.find(params[:id])
  end

  def new
    @review = Review.new
  end

  def edit
    @review = Review.find(params[:id])
  end

  def create
    @review = Review.create(review_params)
     if @review.save
       render json: @review
     else
       render :new
     end
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
    redirect_to user_path(current_user.id)
  end

  
  private
    
    def review_params
      params.require(:review).permit(:content, :book_id, :user_email)
    end

    
    

end

