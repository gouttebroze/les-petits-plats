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

  const {
    term, appliances, ustensils, ingredients
  } = searchForm;

  // recherche globale
  const recipesFiltered = recipes.reduce((acc, curr) => {

    if (curr.name.toLowerCase().includes(term)
      || curr.description.toLowerCase().includes(term)
      || curr.ingredients.ingredient.toLowerCase().includes(term)) {
      acc.push(curr);
    }
    return acc;

  }, []); // initial value is an empty array []

  // filtre par appareil
  /*   const appliancesFilter = recipesFiltered.reduce((acc, curr) => {
      if (curr?.appliances?.toLowerCase().includes(appliances)) {
        acc.push(curr);
      }
      return acc;
    }, []); */

  // filtre par ustensils
  /*   const ustensilsFilter = appliancesFilter.reduce((acc, curr) => {
      if (curr.ustensils.toLowerCase().includes(ustensils)) {
        acc.push(curr);
      }
      return acc;
    }, []);
  
    // filtre par ingredients
    const ingredientsFilter = ustensilsFilter.reduce((acc, curr) => {
      if (curr.ingredients.toLowerCase().includes(ingredients)) {
        acc.push(curr);
      }
      return acc;
    }, []); */

  return recipesFiltered;
  // return appliancesFilter;
  // return ingredientsFilter;
}

function searchByArrayObjects(searchForm) {
  const {
    term, appliances, ustensils, ingredients
  } = searchForm;

  const recipesFiltered = recipes.filter(recipe => {

    // use "some" Array method to loop on "ingredients" array
    return recipe.name.toLowerCase().includes(term)
      || recipe.description.toLowerCase().includes(term)
      || recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(term))

  });
  console.log('recipesFilltered array:', recipesFiltered);

  // check if filtered recipes array is empty, to forward recipes array

  // filter by appliances
  let newRecipesAppliances;
  if (appliances.length === 0) {
    newRecipesAppliances = [...recipesFiltered];
  } else {
    newRecipesAppliances = recipesFiltered.filter(item => {
      if (appliances.includes(item?.appliances?.toLowerCase())) {
        return newRecipesAppliances.push(item);
      }
    })
  }
  console.log('"newRecipesAppliances" array return: ', newRecipesAppliances);

  let newRecipesUstensils;
  if (ustensils.length === 0) {
    newRecipesUstensils = [...newRecipesAppliances];
  } else {
    newRecipesUstensils = newRecipesAppliances.filter(item => {
      return ustensils.includes(item.ustensils.toLowerCase());
    })
  }
  console.log('"newRecipesUstensils" array return: ', newRecipesUstensils);

  let newRecipesIngredients;
  if (ingredients.length === 0) {
    newRecipesIngredients = [...newRecipesUstensils];
  } else {
    newRecipesIngredients = newRecipesUstensils.every(item =>
      item.ingredients.some(ing => ing.ingredient.toLowerCase())
      // console.log('test itération sur tableau "ingredients": ', item.ingredients.ingredient)
    )
  }
  console.log('"newRecipesIngredients" array return: ', newRecipesIngredients);

  // return recipesFiltered // newRecipesAppliances;
  return newRecipesIngredients;
}