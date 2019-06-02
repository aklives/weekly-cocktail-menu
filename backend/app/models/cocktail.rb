class Cocktail < ApplicationRecord
  has_many :day_cocktails
  has_many :days, through: :day_cocktails

end
