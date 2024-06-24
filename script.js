const pokemonData = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const confirm = document.getElementById("search-button");

const input = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokemonImg = document.getElementById("sprite");

const fetchData = async () => {
  try{
    const res = await fetch(pokemonData);
    const data = await res.json();
    const idOrName = input.value;
    showTheData(data, idOrName);
  }catch(err){
    console.log(err);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const showTheData = (data, idOrName) => {
  const { count, results} = data;

  const getName = (name) => {
     pokemonName.innerText = name.toUpperCase();
  }
  const getId = (id) => {
     pokemonId.innerText = `#${id}`;
  }
  
  if(results.some(e => e.id === parseInt(idOrName))) {
    const searchId = parseInt(idOrName);
    const { id, name, url} = results[searchId-1];
    getName(name)
    getId(id);
    const fetchNewData = async () => {
  try{
    const res = await fetch(pokemonData+`/${id}`);
    const data = await res.json();
    showTheSecondData(data);
  }catch(err){
    console.log(err);
  }
}
    fetchNewData();
    
}
else if(results.some(e => e.name === capitalizeFirstLetter(idOrName))){
  console.log(idOrName);
  const searchName = capitalizeFirstLetter(idOrName);
  console.log(searchName);
  let searchId = 0;

  

  for(let i = 0; i < results.length - 1 ; i++){
    if(results[i].name === searchName){
    searchId = i;
    }
  }
  const { id, name, url} = results[searchId];
  getName(name);
  getId(id);
  const fetchNewData = async () => {
  try{
    const res = await fetch(pokemonData+`/${id}`);
    const data = await res.json();
    showTheSecondData(data);
  }catch(err){
    console.log(err);
  }
}
    fetchNewData();
}
else{
  alert("Pokémon not found")
}
}

const getImg = (img) => {
      pokemonImg.src = img;
    }
const getHeight = (height) => {
      pokemonHeight.innerText = "";
      pokemonHeight.innerText += height;
    }
const getWeight = (weight) => {
      pokemonWeight.innerText = "";
      pokemonWeight.innerText += weight;
    }
const getHp = (data) => {
      hp.innerText = data;
}
const getAttack = (data) => {
      attack.innerText = data;
}
const getDefense = (data) => {
      defense.innerText = data;
}
const getSpAttack = (data) => {
      specialAttack.innerText = data;
}
const getSpDefense = (data) => {
      specialDefense.innerText = data;
}
const getSpeed = (data) => {
      speed.innerText = data;
}
const getTypes = (data) => {
      types.innerText = "";
      for(let i=0; i < data.length; i++){
        types.innerHTML += `<div class="types">${data[i].type.name.toUpperCase()}</div>`;
      }
}
const showTheSecondData = (data) => {
    const {base_experience, height, idO, nameO, order, sprites, stats, types, weight} = data;
    const {back_default, back_shiny, front_default, front_shiny} = sprites;
    getImg(front_default);
    console.log(stats[0].base_stat);
    getHeight(height);
    getWeight(weight);
    getHp(stats[0].base_stat);
    getAttack(stats[1].base_stat);
    getDefense(stats[2].base_stat);
    getSpAttack(stats[3].base_stat);
    getSpDefense(stats[4].base_stat);
    getSpeed(stats[5].base_stat);
    getTypes(types);
}

confirm.addEventListener("click", fetchData);
