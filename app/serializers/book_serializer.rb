class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :authorName, :authorLast

 has_many :reviews
 has_many :users, through: :reviews




end
