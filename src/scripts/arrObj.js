/******************************************************************************
 * Global search function
 * - search recipes that includes term (user search)
 * - search / filter recipes by appliances, ustensils or/and ingredients
 ******************************************************************************/
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
function filterByReduce(searchForm) {
  const { term, appliances, ustensils, ingredients } = searchForm;

  // global search using "reduce()" array method
  const recipesFiltered = recipes.reduce((acc, curr) => {

    // search recipes that includes term, into recipes name, desc. or ingredients list
    if (curr.name.toLowerCase().includes(term) ||
      curr.description.toLowerCase().includes(term) ||
      // to browse the ingredients, use the "some()" method to reaching the desired depth
      curr.ingredients.some(ing => ing.ingredient.toLowerCase().includes(term))) {
      acc.push(curr);
    }
    return acc;
  }, []); // initial value is an empty array []

  // to advanced appliances search field,
  const appliancesFilter = recipesFiltered.reduce((acc, curr) => {
    if (curr?.appliance?.toLowerCase().includes(appliances)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  // to advanced ustensils search field 
  const ustensilsFilter = appliancesFilter.reduce((acc, curr) => {
    if (ustensils.every(element => {
      return curr.ustensils.some(ustensil => ustensil.toLowerCase().includes(element));
    })) {
      acc.push(curr); // return a new array with recipes that meet the condition  
    }
    return acc;
  }, []);

  // to advanced ingredient search field
  const ingredientsFilter = ustensilsFilter.reduce((acc, curr) => {
    if (ingredients.every(element => {
      return curr.ingredients.some(ing => ing.ingredient.toLowerCase().includes(element))
    })) {
      acc.push(curr); // return "acc", a new array with recipes that meet the condition  
    }
    return acc;
  }, []);

  // update filters lists with new search results
  const _ingredients = updateIngredientsList("", ingredientsFilter);
  const _appliances = updateAppliancesList("", ingredientsFilter);
  const _ustensils = updateUstensilsList("", ingredientsFilter);
  displayIngredients(_ingredients)
  displayAppliances(_appliances)
  displayUstensils(_ustensils)

  return ingredientsFilter;
}
