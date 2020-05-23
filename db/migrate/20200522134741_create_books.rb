class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :authorName
      t.string :authorLast

      t.timestamps
    end
  end
end
