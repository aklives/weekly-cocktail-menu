class CreateCocktails < ActiveRecord::Migration[5.2]
  def change
    create_table :cocktails do |t|

      t.float :price
      t.string :liquor
      t.float :amount
      t.string :mixer
      t.string :name

      t.timestamps
    end
  end
end
