/**
 * @typedef {Object} SearchQuery
 * @property {string} term - Le terme de recherche saisi par l'utilisateur.
 * @property {string[]} appliances - Une liste d'appareils liés à la recherche.
 * @property {string[]} ustensils - Une liste d'ustensiles liés à la recherche.
 * @property {string[]} ingredients - Une liste d'ingrédients liés à la recherche.
 */

/**
 * Processes a search query object.
 * @param {SearchQuery} searchForm - The search query containing filters.
 * @returns {void}
 */
function searchRecipes(searchForm) {
  const { term, appliances, ustensils, ingredients } = searchForm;
  let newRecipes = [];

  // recherche globale
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i]?.name?.toLowerCase()?.includes(term)
      || recipes[i]?.description?.toLowerCase()?.includes(term)) {
      newRecipes.push(recipes[i]);
      continue;
    }
    for (let j = 0; j < recipes[i]?.ingredients.length; j++) {
      if (recipes[i]?.ingredients[j]?.ingredient?.toLowerCase()?.includes(term)) {
        newRecipes.push(recipes[i]);
      }
    }
  }

  // filtre par appareil
  let newRecipesAppliances = [];
  if (appliances.length === 0) {
    newRecipesAppliances = [...newRecipes];
  } else {
    for (let j = 0; j < newRecipes.length; j++) {
      if (appliances.includes(newRecipes[j]?.appliance.toLowerCase())) {
        newRecipesAppliances.push(newRecipes[j]);
      }
    }
  }

  // filtre par ustensiles
  let newRecipesUstensils = [];
  // si le tab. d'ustensils est vide, on retourne 1 copie du tab. du filtre précédent (permet d'éviter bug, sans aucun résultat, car il faut rendre les recherches précédentes)
  if (ustensils.length === 0) {
    newRecipesUstensils = [...newRecipesAppliances];
  } else {
    for (let k = 0; k < newRecipesAppliances.length; k++) {
      for (let l = 0; l < newRecipesAppliances[k]?.ustensils.length; l++) {
        if (ustensils.includes(newRecipesAppliances[k].ustensils[l].toLowerCase())) {
          newRecipesUstensils.push(newRecipesAppliances[k]);
        }
      }
    }
  }

  // filtre par ingredients
  let newRecipesIngredients = [];
  if (ingredients.length === 0) {
    newRecipesIngredients = [...newRecipesUstensils];
  } else {
    for (let l = 0; l < newRecipesUstensils.length; l++) {
      for (let m = 0; m < newRecipesUstensils[l].ingredients.length; m++) {
        if (ingredients.includes(newRecipesUstensils[l].ingredients[m].ingredient.toLowerCase())) {
          newRecipesIngredients.push(newRecipesUstensils[l]);
        }
      }
    }
  }

  const _ingredients = updateIngredientsList("", newRecipesIngredients);
  const _appliances = updateAppliancesList("", newRecipesIngredients);
  const _ustensils = updateUstensilsList("", newRecipesIngredients);
  displayIngredients(_ingredients)
  displayAppliances(_appliances)
  displayUstensils(_ustensils)

  return newRecipesIngredients;
  // return newRecipesUstensils;
  //return newRecipes;
}