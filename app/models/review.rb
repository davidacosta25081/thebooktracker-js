class Review < ApplicationRecord
  
  belongs_to :book, required: true

end
