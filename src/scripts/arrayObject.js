import { recipes } from "./recipes";

/**
 * use Array object methods
 * @param {*} term 
 * @returns 
 */
export function searchWithArrayObject(term) {
  // search by recipes name, desc. & ingredients
  /* const filterRecipes = recipes
    .filter((recipe) => (recipe.name.toLowerCase().includes(term)))
    .map((recipe) => recipe)
    .forEach((recipe) => console.log(recipe)); */
  const arrObjRecipes = recipes?.filter(r => r?.name === term).map(r => r.name);
  console.log(arrObjRecipes);
  return arrObjRecipes;
}

/**************************************
 * filter recipes using reduce method *
 **************************************/
export function filterByReduceMethod(term) {
  const recipesFiltered = recipes.reduce((acc, curr) => {
    const { id, ...otherProps } = curr;
    if (curr.name.toLowerCase().includes(term) || curr.description.toLowerCase().includes(term)) {
      acc.push(curr);
      // acc[curr.id] = otherProps;
    }
    return acc;
  }, [])
  return recipesFiltered;
}