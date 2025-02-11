/**
 * @typedef {Object} SearchQuery
 * @property {string} term - Le terme de recherche saisi par l'utilisateur.
 * @property {string[]} appliances - Une liste d'appareils liés à la recherche.
 * @property {string[]} ustensils - Une liste d'ustensiles liés à la recherche.
 * @property {string[]} ingredients - Une liste d'ingrédients liés à la recherche.
 */
/**
 * Filters recipes based on search criteria and updates related UI components.
 * @param {SearchQuery} searchForm - The search query object containing filter criteria.
 * @param {string} searchForm.term - The search term entered by the user.
 * @param {string[]} searchForm.appliances - List of appliances to filter by.
 * @param {string[]} searchForm.ustensils - List of ustensils to filter by.
 * @param {string[]} searchForm.ingredients - List of ingredients to filter by.
 * @returns {Object[]} An array of recipe objects that match the search criteria.
 */
function filterByReduce(searchForm) {
  const { term, appliances, ustensils, ingredients } = searchForm;
  const lowerTerm = term.toLowerCase();

  const recipesFiltered = recipes.reduce((acc, curr) => {
    const matchesTerm = curr.name.toLowerCase().includes(lowerTerm) ||
      curr.description.toLowerCase().includes(lowerTerm) ||
      curr.ingredients.some(ing => ing.ingredient.toLowerCase().includes(lowerTerm));

    const matchesAppliances = appliances.length === 0 || appliances.includes(curr.appliance.toLowerCase());
    const matchesUstensils = ustensils.length === 0 || ustensils.every(ust => curr.ustensils.some(u => u.toLowerCase().includes(ust)));
    const matchesIngredients = ingredients.length === 0 || ingredients.every(ing => curr.ingredients.some(i => i.ingredient.toLowerCase().includes(ing)));

    if (matchesTerm && matchesAppliances && matchesUstensils && matchesIngredients) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const _ingredients = updateIngredientsList("", recipesFiltered);
  const _appliances = updateAppliancesList("", recipesFiltered);
  const _ustensils = updateUstensilsList("", recipesFiltered);
  displayIngredients(_ingredients);
  displayAppliances(_appliances);
  displayUstensils(_ustensils);

  return recipesFiltered;
}
