class WelcomeController < ApplicationController

  def home 
    if logged_in? 
	  
    else 
	  redirect_to login_path
    end 
  end 
end
