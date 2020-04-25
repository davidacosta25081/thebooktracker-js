class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author_first_name, :author_last_name

 has_many :reviews

end