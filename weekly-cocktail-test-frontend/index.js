const divContainer = document.querySelector('.container')

function addToDivContainer(dc){
  const cocktail_id = dc.cocktail_id
  function getCocktail(cocktail_id){
    fetch(`http://localhost:3000/cocktails/${cocktail_id}`)
    .then(res => res.json())
    .then(cocktail => {
      const drinkCocktailDiv = document.createElement('div')
      const p = document.createElement('p')
      p.className = "cocktail-info"
      p.innerText = `cocktail_id: ${cocktail.id}, cocktail_name: ${cocktail.name}, cocktail_day: ${dc.day_id}`
      drinkCocktailDiv.appendChild(p)
      divContainer.appendChild(drinkCocktailDiv)
    })
  }
  getCocktail(cocktail_id)
}

function loadCocktails(){
  fetch('http://localhost:3000/day_cocktails')
  .then(res => res.json())
  .then(dc => dc.forEach(addToDivContainer))
}

loadCocktails()
