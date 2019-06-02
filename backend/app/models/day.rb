class Day < ApplicationRecord
  has_many :day_cocktails
  has_many :cocktails, through: :day_cocktails



end
