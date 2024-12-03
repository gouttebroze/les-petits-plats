import { recipes } from "./recipes";

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
export function searchRecipes(searchForm) {
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
  for (let j = 0; j < newRecipes.length; j++) {
    if (appliances.includes(newRecipes[j]?.appliance.toLowerCase())) {
      newRecipesAppliances.push(newRecipes[j]);
    }
  }

  // filtre par ustensiles
  let newRecipesUstensils = [];
  // on recherche sur la rech. principale + sur 1 des filtres (ms les résultats des filtres doivent être combinés et non séparés...donc...)
  for (let k = 0; k < newRecipes.length; k++) {
    for (let l = 0; l < newRecipes[k]?.ustensils.length; l++) {
      if (ustensils.includes(newRecipes[k].ustensils[l].toLowerCase())) {
        newRecipesUstensils.push(newRecipes[k]);
      }
    }
  }

  // filtre par ingredients
  let newRecipesIngredients = [];
  for (let l = 0; l < newRecipes.length; l++) {
    for (let m = 0; m < newRecipes[l].ingredients.length; m++) {
      if (ingredients.includes(newRecipes[l].ingredients[m].ingredient.toLowerCase())) {
        newRecipesIngredients.push(newRecipes[l]);
      }
    }
  }
  //return newRecipesAppliances;
  return newRecipesIngredients;
}