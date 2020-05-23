class User < ApplicationRecord

  validates :name, presence: true
  validates :email, presence: true, uniqueness: {case_sensitive: false}
  
  has_secure_password
  validates :password, presence: true
  
  has_many :reviews
  has_many :books, through: :reviews 





end
