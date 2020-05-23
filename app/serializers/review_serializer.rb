class ReviewSerializer < ActiveModel::Serializer
  
  attributes :id, :content
  belongs_to :book
  belongs_to :user


end
