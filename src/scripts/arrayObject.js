import { recipes } from "./recipes";


/* export function searchWithArrayObject(term) {
  // search by recipes name, desc. & ingredients
  const arrObjRecipes = recipes?.filter(r => r?.name === term).map(r => r.name);
  console.log(arrObjRecipes);
  return arrObjRecipes;
} */

/**************************************
 * filter recipes using reduce method *
 **************************************/

/**
 * use Array object methods
 * @param {string[]} term 
 * @returns {string[]} recipesFiltred - a new array that contains search result values
 */
export function filterByReduceMethod(term) {
  const recipesFiltered = recipes.reduce((acc, curr) => {
    // acc. (or accumulator), curr. (or current value)
    const { id, ...otherProps } = curr; // destructuring recipes array, that is the curr. val. ("curr")
    if (curr.name.toLowerCase().includes(term) || curr.description.toLowerCase().includes(term)) {
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