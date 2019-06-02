class CreateDayCocktails < ActiveRecord::Migration[5.2]
  def change
    create_table :day_cocktails do |t|

      t.belongs_to :day
      t.belongs_to :cocktail

      t.timestamps
    end
  end
end
