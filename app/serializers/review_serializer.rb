class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_email

  belongs_to :book
  belongs_to :user
  

end
