//defining variables
let page = 1
const url = 'http://localhost:3000/monsters'
let addMonst = false
//what to do when the dom content loads
document.addEventListener('DOMContentLoaded', function(){
    const createBtn = document.getElementById('create')
    const formContainer = document.getElementById('create-monster')
    createBtn.addEventListener('click', ()=>{
        if (addMonst = !addMonst){
            formContainer.style.display = 'block'
        }else{
            formContainer.style.display = 'none'
        }

    })
    formContainer.addEventListener('submit', handleCreate)
    

    // Event listeners for pagination buttons
    document.getElementById('back').addEventListener('click', function() {
        if (page > 1) {
            page--;
            getMonsters(page);
        }
    });

    document.getElementById('forward').addEventListener('click', function() {
        page++;
        getMonsters(page);
    });
})

function handleCreate(e){
  e.preventDefault()
  let name = document.getElementById('name').value
  let age = document.getElementById('age').value
  let description = document.getElementById('description').value
  let monstObj = {
    name,
    age,
    description
  }
  createNewMonster(monstObj)
}

//render monster
function renderMonsters(monsters){
   const monsterCard = document.createElement('div')
   monsterCard.className = 'monster-card'
   monsterCard.innerHTML =`
     
      <h2>NAME: ${monsters.name}</h2>
      <h4>AGE: ${monsters.age}</h4>
      <p>DESCRIPTION: <i>${monsters.description}</i></p>
      
   `
   document.querySelector('#monster-container').appendChild(monsterCard)
}

//http requests
function getMonsters(pageNumber){
    fetch(`${url}?_limit=500&_page=${pageNumber}`)
    .then(res=>res.json())
    .then(data=>{
        document.querySelector('#monster-container').innerHTML = ''
        data.forEach(monster=>renderMonsters(monster))
    })
}
function createNewMonster(newMonsters){
    fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newMonsters)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        getMonsters()
    })
}
//pagination controls
document


function initialize(){
    getMonsters(page)
}
initialize()