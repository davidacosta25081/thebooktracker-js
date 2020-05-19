
class SessionsController < ApplicationController
  
  def new 

  end 


  def create
      if params[:session]
        @user = User.find_by(email: params[:session][:email])
        valid_reg_user(@user)
        
      else

        @user = User.find_or_create_by!(uid: auth['uid']) do |u|
        u.name = auth['info']['name']
        u.email = auth['info']['email']
        u.image = auth['info']['image']
        u.password = SecureRandom.urlsafe_base64
      end
 
      
     
      
      session[:user_id] = @user.id
       
      render 'welcome#home'
    end
  end 


def destroy
    log_out
    flash[:danger] = "Goodbye, thank you for using TheBookTracker!"
    redirect_to login_path
  end



private 

  def auth
    request.env['omniauth.auth']
  end



end