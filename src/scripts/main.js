import { recipes } from './recipes';
import RecipeCard from './recipeCard.js';

const $dropdown1 = document.querySelector('.first');
const $dropdown2 = document.querySelector('.second');
const $dropdown3 = document.querySelector('.third');
const $buttonTag = document.querySelector('.toggle-tag');
const $closeTag = document.querySelector('.close-tag');
const $filter = document.querySelector('.filter-btn');
const $filterList = document.querySelector('.filter-list');
const $arrowDown = document.querySelector('.arrow-down')
const $arrowUp = document.querySelector('.arrow-up');
const $filterInput = document.querySelector('input[name="ingredient"]');
const $inputIcon = document.querySelector('.input-icons');
const $totalRecipesDisplayed = document.querySelector('.total-recipies');

$filter.addEventListener('click', () => {
  $filterList.style.display = 'block';
  $arrowDown.style.display = 'none';
  $arrowUp.style.display = 'block';
  $filterInput.style.display = 'block';
  $inputIcon.style.display = 'flex';
});

$filterList.addEventListener('click', () => {
  $buttonTag.style.display = 'block';
  $filterList.style.display = 'none';
  $arrowUp.style.display = 'none';
  $arrowDown.style.display = 'block';
  $filterInput.style.display = 'none';
  $inputIcon.style.display = 'none';
})

$closeTag.addEventListener('click', () => {
  $buttonTag.style.display = 'none';
})

function filterInputValue() {
  $filterInput.addEventListener('change', (e) => {
    e.preventDefault();
    const target = e.target.value;
    console.log(target);
  })
}

filterInputValue();

/* calcul du nombre de recettes affichées */
let totalRecipes = recipes.length
console.log(totalRecipes);
let $displayRecipesNumber = document.createElement('h3');
$displayRecipesNumber.setAttribute('class', 'recipes-number anton');
$displayRecipesNumber.textContent = `${totalRecipes} recettes`;
$totalRecipesDisplayed.appendChild($displayRecipesNumber);

const allRecipes = recipes.flatMap((r) => r.ingredients);

async function displayRecipeData() {
  const $recipeSection = document.querySelector('.recipes-wrapper');
  //const $ingredientList = document.querySelector('.ingredients-recipe');
  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $recipeSection.appendChild(Template.createRecipeCard());
  })

  allRecipes.map((ingredient) => {
    const Template = new RecipeCard(ingredient);
    $recipeSection.appendChild(Template.createIngredientsList());
  })

  console.log(recipes); // recup. recettes
  console.log(allRecipes); // recup. ingredients
  console.log(recipes[1].ingredients[0]);  // recup. les ingredients de la 1ere recette



}

async function init() {
  displayRecipeData();
}

//recipes;

init();

/**
 * bubble sort algo. implementation
 *  
   *  "isSwapped", de type booléen, indique si un échange à été fait
   * Initialement, la variable "isSwapped" est à FALSE (comme on a pas encore fait d'échange)
   * on lance 1 boucle qui va parcourir tout le tableau, ds laquelle on lance alors une condition qui vérifie si l'élements doit être échangé, 
   * si la condition est vérifiée, on rendre dedans, puis on traite l'échange, 
   * ce qui va modifier la valeur de la variable "isSwapped", 
   * qui passe de FALSE à TRUE, on pt alors indiquer "isSwapped = true"
   */

// tableau non trié
const unsortedArray = [100, 4, 2, 90, 9, 654, 33, 32, 23];

function bubbleSort(array) {
  const arrayLength = array.length;
  let isSwapped;
  do {
    isSwapped = false;

    // arrayLength - 1 : car on ne vérifie pas le dernier élement (qui n'aurait rien à quoi être comparé)
    for (let i = 0; i < arrayLength - 1; i++) {

      // là, on compare la valeur de l'item avec la valeur de son voisin à gauche (ou précédent)
      if (array[i] > array[i + 1]) {
        // on échange...
        const tempLeftValue = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tempLeftValue;

        // ok, c'est échangé, donc...
        isSwapped = true;
      }
    }
  } while (isSwapped);

  return array;
};

// test algo de tri à bulle sur notre tableau à la base désordonné
console.log(bubbleSort(unsortedArray));
// soit 1 tab. ordonné: [2, 4, 9, 23, 32, 33, 90, 100, 654]

/***********************************************
 * fn de tri par insertion - insertionSort
 ***********************************************/
const newUnsortedArray = [1689, 2128, 2024, 1980, 1555, 1894, 2001];

function insertionSort(arrayToSort) {
  for (let i = 0; i < arrayToSort.length; i++) {
    let currentItem = arrayToSort[i];
    let currentLeftIndex = i - 1;

    while (currentLeftIndex >= 0 && arrayToSort[currentLeftIndex] > currentItem) {

    }
  }
}

/*********************************************
 * Tri fusion (merge sort)
Le tri fusion est un algorithme de la grande famille des algorithmes « diviser pour régner« . Il est légèrement plus complexe que les algorithmes précédents, mais son efficacité est redoutable ! En particulier sur de grandes séquences de données.

Cet algorithme de tri a une logique un peu plus complexe.

On va commencer par diviser le tableau en deux éléments égaux.
On va recommencer la même chose jusqu’à atteindre un seul élément par séparation.
Ensuite, on va refusionner les éléments séparés de façon récursive en les triant à chaque niveau.
C’est en comparant et permutant les éléments niveau par niveau qu’on construit un nouveau tableau trié
 ********************************************/

