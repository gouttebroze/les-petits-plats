/** 
 * fn to update filters lists items
 * @property {string} term
 * @property {string[]} _recipes
 * @returns {void}
 */
function updateIngredientsList(term, _recipes = recipes) {
  let updatedIngredients = [];
  for (let i = 0; i < _recipes.length; i++) {
    for (let j = 0; j < _recipes[i].ingredients.length; j++) {
      if (_recipes[i].ingredients[j].ingredient.toLowerCase().includes(term.toLowerCase())) {
        updatedIngredients.push(_recipes[i].ingredients[j].ingredient.toLowerCase());
      }
    }
  }

  let uniqueIngredients = [];
  for (let i = 0; i < updatedIngredients.length; i++) {
    // on récupère l'index, puis on le compare à l'index du tableau, indexOf retourne le 1er index si doublon
    const ingredientIndex = updatedIngredients.indexOf(updatedIngredients[i]);
    if (i === ingredientIndex) {
      uniqueIngredients.push(updatedIngredients[i]);
    }
  }
  return uniqueIngredients;
}

function updateAppliancesList(term, _recipes = recipes) {
  let updatedAppliances = [];
  for (let i = 0; i < _recipes.length; i++) {
    if (_recipes[i].appliance.toLowerCase().includes(term.toLowerCase())) {
      updatedAppliances.push(_recipes[i].appliance.toLowerCase());
    }
  }
  let uniqueAppliances = [];
  for (let i = 0; i < updatedAppliances.length; i++) {
    const applianceIndex = updatedAppliances.indexOf(updatedAppliances[i]);
    if (i === applianceIndex) {
      uniqueAppliances.push(updatedAppliances[i]);
    }
  }
  return uniqueAppliances;
}

function updateUstensilsList(term, _recipes = recipes) {
  let updatedUstensils = [];
  for (let i = 0; i < _recipes.length; i++) {
    for (let j = 0; j < _recipes[i].ustensils.length; j++) {
      if (_recipes[i].ustensils[j].toLowerCase().includes(term.toLowerCase())) {
        updatedUstensils.push(_recipes[i].ustensils[j].toLowerCase());
      }
    }
  }
  // suppression d'éventuels doublons
  let uniqueUstensils = [];
  for (let i = 0; i < updatedUstensils.length; i++) {
    const ustensilIndex = updatedUstensils.indexOf(updatedUstensils[i]);
    // indexOf() récupère l'index et, en cas de doublon, récupère uniquement le 1er index de(s) l'élément(s) trouvé(s)
    if (i === ustensilIndex) {
      uniqueUstensils.push(updatedUstensils[i]);
    }
  }
  return uniqueUstensils;
}