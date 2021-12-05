# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Cocktail.destroy_all
Day.destroy_all
DayCocktail.destroy_all


Cocktail.create([

  {price: 7.99, liquor: "vodka", amount: 3.0, mixer: "orange juice", name: "Screwdriver"},
  {price: 7.99, liquor: "vodka", amount: 3.0, mixer: "cranberry juice", name: "Vodka Cran"},
  {price: 8.99, liquor: "rum", amount: 3.0, mixer: "coke", name: "Rum and Coke"},
  {price: 6.99, liquor: "rum", amount: 3.0, mixer: "pineapple juice", name: "Pina Colada"},
  {price: 9.99, liquor: "tequila", amount: 3.0, mixer: "lime juice", name: "Margarita"},
  {price: 7.99, liquor: "whiskey", amount: 3.0, mixer: "lemon juice", name: "Whiskey sour"},
  {price: 7.99, liquor: "gin", amount: 3.0, mixer: "tonic water", name: "Gin and Tonic"},
  {price: 7.99, liquor: "gin", amount: 3.0, mixer: "ginger ale", name: "7 & 7"},
  {price: 8.99, liquor: "whiskey", amount: 1.5, mixer: "Guiness", name: "Irish Car Bomb"},
  {price: 9.99, liquor: "whiskey", amount: 4.5, mixer: "vermouth", name: "Manhattan"}

])

Day.create ([

{name: "Sunday"},
{name: "Monday"},
{name: "Tuesday"},
{name: "Wednesday"},
{name: "Thursday"},
{name: "Friday"},
{name: "Saturday"}

])

DayCocktail.create([{day_id: 1, cocktail_id: 1}, {day_id: 2, cocktail_id: 2}, {day_id: 3, cocktail_id: 3}, {day_id: 4, cocktail_id: 4}, {day_id: 5, cocktail_id: 5}, {day_id: 6, cocktail_id: 6}, {day_id: 7, cocktail_id: 7}])
