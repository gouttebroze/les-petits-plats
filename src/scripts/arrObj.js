function filterByReduceMethod(term) {
  const recipesFiltered = recipes.reduce((acc, curr) => {
    // acc. (or accumulator), curr. (or current value)
    // const { id, ...otherProps } = curr; // destructuring recipes array, that is the curr. val. ("curr")
    if (curr.name.toLowerCase().includes(term)
      || curr.description.toLowerCase().includes(term)
      || curr?.ingredients?.ingredient?.toLowerCase()?.includes(term)) {
      acc.push(curr);
      /* to each time it's processed, we push the elements into the acc., 
      that is an array (because it start with initial value, that is an empty array)
      */
    }
    return acc; /* return accumulator - it's operation works as follow: 
        - each of the values in the table is processed, 
        and each time it is processed, the value accumulates, 
        starting with the initial value, & until acc. is returned...    
    */
  }, []); // initial value is an empty array []
  return recipesFiltered;
}

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
      acc.push(curr); // return a new array with recipes that meet the condition  
    }
    return acc;
  }, []);

  // to advanced ustensils search field 
  const ustensilsFilter = appliancesFilter.reduce((acc, curr) => {
    if (curr.ustensils.some(ustensil => ustensil.toLowerCase().includes(ustensils))) {
      acc.push(curr); // return a new array with recipes that meet the condition  
    }
    return acc;
  }, []);

  // to advanced ingredient search field
  const ingredientsFilter = ustensilsFilter.reduce((acc, curr) => {
    if (curr.ingredients.some(ing => ing.ingredient.toLowerCase().includes(ingredients))) {
      acc.push(curr); // return "acc", a new array with recipes that meet the condition  
    }
    return acc;
  }, []);
  // return recipesFiltered; // return appliancesFilter; // return ustensilsFilter;
  return ingredientsFilter;
}
