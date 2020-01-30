class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content

  belongs_to :user
  belongs_to :book

end
