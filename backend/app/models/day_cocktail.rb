class DayCocktail < ApplicationRecord
  belongs_to :cocktail
  belongs_to :day

  validates_uniqueness_of :day, scope: :cocktail 
end
