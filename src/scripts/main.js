import { recipes } from './recipes';
import RecipeCard from './recipeCard.js';

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
    // console.log(target);
    return target;
  })
}

filterInputValue();

/* calcul du nombre de recettes affichées */
let totalRecipes = recipes.length
// console.log(totalRecipes);
let $displayRecipesNumber = document.createElement('h3');
$displayRecipesNumber.setAttribute('class', 'recipes-number anton');
$displayRecipesNumber.textContent = `${totalRecipes} recettes`;
$totalRecipesDisplayed.appendChild($displayRecipesNumber);

const allRecipes = recipes.flatMap((r) => r.ingredients);

async function displayRecipeData() {
  const $recipeSection = document.querySelector('.recipes-wrapper');
  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $recipeSection.appendChild(Template.createRecipeCard());
  })

  allRecipes.map((ingredient) => {
    const Template = new RecipeCard(ingredient);
    $recipeSection.appendChild(Template.createIngredientsList());
  })
  // console.log(recipes); // recup. recettes
  // console.log(allRecipes); // recup. ingredients
  // console.log(recipes[1].ingredients[0]);  // recup. les ingredients de la 1ere recette
}

async function init() {
  displayRecipeData();
}

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
// console.log(bubbleSort(unsortedArray)); // soit 1 tab. ordonné: [2, 4, 9, 23, 32, 33, 90, 100, 654]

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

/****************************************************************************
 ************************ Méthodes de l'objet Array *************************
 ****************************************************************************/
const bands = [
  { nom: 'Ramones', from: 'New-York' },
  { nom: 'The Pogues', from: 'London' },
  { nom: 'Raï-Kho-Ris', from: 'Népal' },
  { nom: 'Earth', from: 'Seattle' },
  { nom: 'Butthole Surfers', from: 'Austin, Texas' },
  { nom: 'The Clash', from: 'London' },
];

// 1ere approche consiste à maper sur les objets du tableau pr utiliser les méthodes "includes()" & "indexOf()"
const noms = bands.map(el => el.nom);
// console.log(noms.includes("The Pogues")); // true
// console.log(noms.indexOf("Earth")); // 3

// seconde approche où on travail directement sur le tableau
// console.log(bands.find(el => el.from === "London"));
// console.log(bands.filter(el => el.from === "London"));
// console.log(bands.find(el => el.nom === "Ramones")); // retourne l'objet entier soit { nom: 'Ramones', from: 'New-York' },
// console.log(bands.filter(el => el.nom === "Butthole")); // ne retourne rien (manque une partie du nom), voir comment faire...

/***********************************************
 **** Recherche principale dès 3 caractères ****
 ***********************************************/
const $primarySearch = document.getElementById('primary-search');

// on initie 1 tab. vide pr y stocker nos élements trouvés
// mais problème du tableau, on pt avoir des doublons,
// pr remédier à ce problème, on pt stocker nos el. ds 1 set à la place (on ne pt pas avoir de doublon ds 1 set), 
// en revanche on perd la notion d'index (1 set n'a pas d'index)
// let searchValue = [];
let searchValue = new Set();

/***********************************************
******** Approche avec Boucles natïves ********
***********************************************/
/**
 * fonction de recherche, le drapeau passant à TRUE indique que l'élement est trouvé
 * @param {string} target - chaîne de charactère dont recherche un chaîne égale ds le tableau de recettes
 * @returns {array} searchValue[] - nouveau tableau contenant l'élement (qui a été trouvé dans le tableau initial)
 */
function searchForRecipes(target) {
  let flag = false;
  // ex.: si cherche "Brownie", retourne: "trouvé"
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      // trie sur "name" & sur "description" du tab. "recipes" & sur "ingredient" du tab. "ingredients"
      if (target === recipes[i].name || target === recipes[i].description || target === recipes[i].ingredients[j].ingredient) {
        flag = true;
      }
    }
  }
  if (flag === true) {
    console.log("trouvé");
    // searchValue.push(target); // on stock nos élements trouvé ds 1 tableau "searchValue"
    searchValue.add(target); // on stock nos élements trouvé ds 1 set (pr éviter les doublons)
  } else {
    console.log("pas trouvé");
  }
  console.log("Elements trouvés: ", searchValue);
  return searchValue;
}

// console.log(recipes.ingredients.length);


/**
 * on utilise la fn précédente dans cet écouteur d'évenement
 * fn ayant en paramètre la valeur de l'event soumis ds l'input de recherche principale
 */
$primarySearch.addEventListener('change', (e) => {
  console.log(e.target.value);
  let target = e.target.value;
  searchForRecipes(target);
});

/* TODO: stocker les el. ds le localstorage?
*/

/************************************************
**** Approche avec méthodes de l'objet Array ****
*************************************************/
// console.log("tableau de recettes: ", recipes);
// console.table("tableau de recettes: ", recipes);

$primarySearch.addEventListener('change', (e) => {
  // console.log(e.target.value);
  let searchFor = e.target.value;
  // let searchValue = [];

  /**
   * les méthodes .filter() & .find() retourne l'objet complet
   * exemple: tape "Brownie", retourne son id, non, des, ingredients ...
   */
  const result = recipes.filter(el => el.name === searchFor)
  // console.log(result.filter(el => el));
  // console.log(recipes.find(el => el.name === searchFor));

  const recipeName = recipes.map(el => el.name === searchFor);
  // console.log(recipeName);
  //console.log(recipes.includes(searchFor));
  // console.log(recipes.indexOf(searchFor));
  // console.table(searchValue.push(recipeName));

  /* if (recipeName === true) {
    searchValue.push(searchFor);
    // console.table(searchValue);
  } */

})


