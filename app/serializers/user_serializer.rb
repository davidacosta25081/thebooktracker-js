class UserSerializer < ActiveModel::Serializer
  
attributes :id, :email

  has_many :reviews
  has_many :books, through: :reviews  

end
