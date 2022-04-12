

const app = {}

app.$dropdown = $("#dropdown")
app.$container = $(".pokemonContainer")

app.displayPokemon = (pocketMonster) => { 
  const pokemonObj = pocketMonster.sprites.other.home
  const pokemonHtmlContent = `
  <div class="pokeCard">
    <h3 class="pokeTitle">Shiny ${pocketMonster.name}</h3>
    <div class="imageContainer">
      <img class="pokeImage" src="${pokemonObj.front_shiny}" alt="Photo of ${pocketMonster.name}" />
    </div>
  </div>
  `
  app.$container.append(pokemonHtmlContent)
}

app.getSelectedPoke = () => {
  app.$dropdown.on("change", () => {
    const selection = $("option:selected").val();
    app.$container.empty();
    app.getPokemonImage(selection);
  })
}


app.fillDropdown = () => {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon`,
    method: "GET",
    dataType: "json",
    data: {
      limit: 151,
    }
  }).then((data) => {
    data.results.forEach(pokemon => {
      const optionElement = `<option value="${pokemon.name}">${pokemon.name}</option>`
      app.$dropdown.append(optionElement)
      
      
    });
  });
}

app.getPokemonImage = (query) => {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${query}`,
    method: "GET",
    dataType: "json",
  }).then((pocketMonster) => {
    app.displayPokemon(pocketMonster)
  })
}

app.init = () => {
  app.fillDropdown()
  app.getPokemonImage("bulbasaur")
  app.getSelectedPoke()
}

$(document).ready(() => {
  app.init()
})