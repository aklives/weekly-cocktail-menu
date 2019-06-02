const divContainer = document.querySelector('.container')
let new_cocktail = true
const divFooter = document.querySelector('.footer')

function loadFooter(){
  divFooter.innerHTML = ""
  const reloadDiv = document.createElement('div')
  const p = document.createElement('p')
  reloadDiv.className = "reload-week-div"
  p.className = "reload week"
  p.innerText = "reload week"
  p.addEventListener("click", loadDays)
  reloadDiv.appendChild(p)
  divFooter.appendChild(reloadDiv)
}


function loadDays(){
  new_cocktail = true
  divContainer.innerHTML = ""
  divFooter.innerHTML = ""
  fetch('http://localhost:3000/days')
  .then(res => res.json())
  .then(days => days.forEach(addDayToDom))
}

function getCocktail(dc){
  fetch(`http://localhost:3000/cocktails/${dc.cocktail_id}`)
  .then(res => res.json())
  .then(cocktail => addCocktailForDay(cocktail, dc))

}

function deleteDrink(cocktail, dc){
  fetch(`http://localhost:3000/day_cocktails/${dc.id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(doc => {
    const mainDiv = document.querySelector('.days-cocktails')
    const cocktailDiv = document.querySelector(`.cocktail-${cocktail.id}-info`)
    mainDiv.removeChild(cocktailDiv)
  })


}

function addCocktailForDay(cocktail, dc){
  loadFooter()
  const mainDiv = document.querySelector('.days-cocktails')
  const cocktailDiv = document.createElement('div')
  cocktailDiv.className = `cocktail-${cocktail.id}-info`
  const p_name = document.createElement('p')
  p_name.innerHTML = `<strong>${cocktail.name}</strong>`
  cocktailDiv.appendChild(p_name)
  const p_price = document.createElement('p')
  p_price.innerHTML = `$${cocktail.price}`
  cocktailDiv.appendChild(p_price)
  const p_liquor = document.createElement('p')
  p_liquor.innerHTML = `liquor: ${cocktail.liquor}`
  cocktailDiv.appendChild(p_liquor)
  const p_amount = document.createElement('p')
  p_amount.innerHTML = `amt: ${cocktail.amount} ozs.`
  cocktailDiv.appendChild(p_amount)
  const p_mixer = document.createElement('p')
  p_mixer.innerHTML = `mixer: ${cocktail.mixer}`
  cocktailDiv.appendChild(p_mixer)
  const deleteButton = document.createElement('BUTTON')
  deleteButton.innerText = "Delete Drink"
  deleteButton.addEventListener("click", function(){
    deleteDrink(cocktail, dc)
  })
  cocktailDiv.appendChild(deleteButton)
  mainDiv.appendChild(cocktailDiv)

}

function createDC(event){
  event.preventDefault();
  const cocktail_id = parseInt(document.getElementById("select-drink").value)
  const day_id = parseInt(event.target.dataset.day_id)
  fetch("http://localhost:3000/day_cocktails", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({ day_id: day_id, cocktail_id: cocktail_id})
  })
  .then(res => res.json())
  .then(dc => {
    addDayCocktailToDiv(dc)
    drinkForm = document.querySelector('.drink-form')
    const selectDiv = document.querySelector('#select-div')
    divFooter.removeChild(selectDiv)
    const p_select = document.createElement('p')
    p_select.innerText = "add cocktail to day"
    p_select.className = "p-add-cocktail"
    p_select.dataset.day_id = dc.day_id
    p_select.addEventListener("click", addCocktailToDay)
    divFooter.appendChild(p_select)
    })
  }


function addCocktailToDay(event){

  const p_add_cocktail = event.target
  divFooter.removeChild(p_add_cocktail)
  const selectDiv = document.createElement('div')
  selectDiv.id = 'select-div'
  selectDiv.className = 'input-field col s12'
  const select = document.createElement('select')
  select.id = "select-drink"
  select.className = 'browser-default'
  select.innerHTML = `
    <option value = "" disabled selected>Choose your Cocktail</option>
    <option value = "1">Screwdriver</option>
    <option value = "2">Vodka Cran</option>
    <option value = "3">Rum & Coke</option>
    <option value = "4">Pina Colada</option>
    <option value = "5">Margarita</option>
    <option value = "6">Whiskey Sour</option>
    <option value = "7">Gin and Tonic</option>
    <option value = "8">7 & 7</option>
    <option value = "9">Irish Car Bomb</option>
    <option value = "10">Manhattan</option>
  `
  button = document.createElement('button')
  button.innerText = "Submit"
  button.dataset.day_id = parseInt(event.target.dataset.day_id)
  button.addEventListener("click", createDC)
  selectDiv.appendChild(select)
  selectDiv.appendChild(button)
  divFooter.appendChild(selectDiv)


}

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('select');
//     var instances = M.FormSelect.init(elems, options);
//   });


function addDayCocktailToDiv(dc){
  if (new_cocktail){
    const newDiv = document.createElement("div")
    const p = document.getElementById(`day-${dc.day_id}`)
    newDiv.className = "days-cocktails"
    const dayName = p.dataset.name
    const p_select = document.createElement('p')
    p_select.innerText = "add cocktail to day"
    p_select.className = "p-add-cocktail"
    p_select.dataset.day_id = dc.day_id
    p_select.addEventListener("click", addCocktailToDay)
    divFooter.appendChild(p_select)
    divContainer.innerHTML = ""
    newDiv.innerHTML = `
      <h2 class="day-name">${dayName}</h2>
    `
    divContainer.appendChild(newDiv)
    getCocktail(dc)
  }
  else {
    getCocktail(dc)
  }
  new_cocktail = false

}


//loads cocktails for specific days
function loadDayCocktails(event){

  fetch('http://localhost:3000/day_cocktails')
  .then(res => res.json())
  .then(dcs => dcs.filter(dcs => dcs.day_id == event.target.dataset.id))
  .then(dcs => dcs.forEach(addDayCocktailToDiv))
}

// function createForm(form, dayId){
//   form.innerHTML = `
//   <label for="Edit Day">New Day Name:</label>
//   <input type="text" class="form-control" id="edit-day">
//   <button type="submit" class="edit-day-btn" id=${dayId}>Submit</button>
//
//   `
//   form.addEventListener('submit', function(){
//     editDayMore(event, form)
//   })
// }

// function editDayMore(event, form){
//   event.preventDefault();
//   const newDayName = event.target.querySelector('.form-control').value
//
//   const button = event.target.querySelector('.edit-day-btn')
//   const dayId = button.id
//   console.log(newDayName)
//   fetch(`http://localhost:3000/days/${dayId}`, {
//     method: "PATCH",
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({ name: newDayName })
//   }).then(res => res.json())
//     .then(doc => form.remove())
// }

// function editDay(event){
//   const dayId = event.target.dataset.dayId
//   const newDiv = document.querySelector(`.day-div-${dayId}`)
//   const form = document.createElement('form')
//   createForm(form, dayId)
//   newDiv.appendChild(form)
//
// }

//populates a list of clickable days
function addDayToDom(day){
  const newDiv = document.createElement('div')
  newDiv.className = `day-div-${day.id}`
  const p = document.createElement('p')
  p.className = "day-p"
  p.id = `day-${day.id}`
  p.dataset.name = day.name
  p.dataset.id = day.id
  p.innerHTML = day.name
  p.addEventListener("click", loadDayCocktails)
  newDiv.appendChild(p)

  divContainer.appendChild(newDiv)

}

loadDays()
