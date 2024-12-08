import { recipes } from "./recipes";

export function filterRecipesByIngredients(term) {
  const recipesFilteredByIngredients = recipes.reduce((acc, curr) => {
    if (curr?.ingredients?.ingredient?.includes(term)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return recipesFilteredByIngredients;
}

/**
 * @param {string} term 
 * @returns {string[]}
 */
export function filterRecipesByAppliances(term) {
  const recipesFilteredByAppliances = recipes.reduce((acc, curr) => {
    if (curr?.appliance?.toLowerCase().includes(term)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return recipesFilteredByAppliances;
}

export function filterRecipesByUstensils(term) {
  const recipesFilteredByUstensils = recipes.reduce((acc, curr) => {
    if (curr?.ustensils.includes(term)) { // debugage en supprimant "toLowerCase()"
      acc.push(curr);
    }
    return acc;
  }, []);
  return recipesFilteredByUstensils;
}
