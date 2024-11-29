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
const $totalRecipesDisplayed = document.querySelector('.total-recipes');
const $recipeSection = document.querySelector('.recipes-wrapper');
const $primarySearch = document.getElementById('primary-search');
const $applianceTag = document.getElementById('appliance-tag');
const $ustensilsBtn = document.querySelector('.ustensils-filter-btn');
const $ustensilsList = document.querySelector('.ustensils-filter-list');

function displayUstansilsList() {
  let ustansilsList = new Set();
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
      ustansilsList.add(recipes[i].ustensils[j]);
      console.log(recipes[i].ustensils[j]);
      document.getElementById('ustensils-list').innerHTML += `<li>${recipes[i].ustensils[j]}</li>`;
    }
  }
  $ustensilsBtn.addEventListener('click', () => {
    $ustensilsList.style.display = 'block';
    $arrowDown.style.display = 'none';
    $arrowUp.style.display = 'block';
    $filterInput.style.display = 'block';
    $inputIcon.style.display = 'flex';
  });
  $ustensilsList.addEventListener('click', () => {
    $buttonTag.style.display = 'block';
    $ustensilsList.style.display = 'none';
    $arrowUp.style.display = 'none';
    $arrowDown.style.display = 'block';
    $filterInput.style.display = 'none';
    $inputIcon.style.display = 'none';
  })
  $closeTag.addEventListener('click', () => {
    $buttonTag.style.display = 'none';
  })
}

function updateIngredientsList(term) {

  let updatedIngredients = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(term.toLowerCase())) {
        updatedIngredients.push(recipes[i].ingredients[j].ingredient.toLowerCase());
      }
    }

  }
  let uniqueIngredients = [];
  for (let i = 0; i < updatedIngredients.length; i++) {
    // on récupère l'index, puis on le compare à l'index du tableau, indexOf retourne le 1er index si doublon
    const ingredientIndex = updatedIngredients.indexOf(updatedIngredients[i])
    if (i === ingredientIndex) {
      uniqueIngredients.push(updatedIngredients[i]);
    }
  }
  return uniqueIngredients;
}

function displayIngredients(ingredients) {
  let applianceArray = [];
  /* for (let i = 0; i <= recipes.length; i++) {
    applianceArray.push(recipes[i]?.appliance);
    console.log(applianceArray);

  } */
  const $div = document.querySelector('#ingredients');
  let $ul = '<ul>';
  /* for (arr of applianceArray) { */
  for (let i = 0; i < ingredients.length; i++) {
    $ul += `<li>${ingredients[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);

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
    for (let i = 0; i < recipes.length; i++) {
      $applianceTag.textContent = `${recipes[i]?.appliance}`;
    }
  })
  $closeTag.addEventListener('click', () => {
    $buttonTag.style.display = 'none';
  })
}

function filterInputValue() {
  $filterInput.addEventListener('change', (e) => {
    e.preventDefault();
    const target = e.target.value;
    return target;
  })
}

filterInputValue();

/* calcul du nombre de recettes affichées */
function totalRecipedDisplayed(recipes) {
  let totalRecipes = recipes.length;
  let $displayRecipesNumber = document.createElement('h3');
  $displayRecipesNumber.setAttribute('class', 'recipes-number anton');
  $displayRecipesNumber.textContent = `${totalRecipes} recettes`;
  $totalRecipesDisplayed.appendChild($displayRecipesNumber);
  return totalRecipes;
}

// const allRecipes = recipes.flatMap((r) => r.ingredients);


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
function searchRecipes(searchForm) {
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
    if (appliances.includes(newRecipes[j].appliance.toLowerCase())) {
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

  return newRecipesIngredients; // on ne retourne qu'un seul filtre (alors que leurs résultats doivent être combinés)
}

async function displayRecipeData(recipes) {
  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $recipeSection.appendChild(Template.createRecipeCard());
  })
}

function deleteDisplayData() {
  $recipeSection.textContent = '';
  // document.querySelector('.recipes-number').insertAdjacentText('afterbegin', '');
  document.querySelector('.recipes-number').textContent = '';
}

function resetSearchInput() {
  $searchForm = document.querySelector('.search-input');
  $searchForm.innerHTML = '';
}

let searchValue = new Set();
function searchForRecipes(target) {
  let flag = false;
  // ex.: si cherche "Brownie", retourne: "trouvé"
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      // trie sur "name" & sur "description" du tab. "recipes" & sur "ingredient" du tab. "ingredients"
      if (target === recipes[i].name.toLocaleLowerCase()
        || target === recipes[i].description
        || target === recipes[i].ingredients[j].ingredient
      ) {
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

function searchSubStringsInRecipes(substring) {
  let sortedRecipes = [];
  for (let i = 0; i <= recipes.length; i++) {
    if (recipes[i]?.name.indexOf(substring) !== -1
      || recipes[i]?.description.indexOf(substring) !== -1) {
      sortedRecipes.push(recipes[i]);
      continue;
    }
    /* for (let j = 0; j <= recipes[i]?.ingredients.length; j++) {
      if (recipes[i]?.ingredients[j]?.ingredient.indexOf(substring) !== -1) {
        sortedRecipes.push(recipes[i]);
      }
    } */
  }
  return sortedRecipes;
}
console.log(searchSubStringsInRecipes('courge'));


document.addEventListener("DOMContentLoaded", function () {

  displayRecipeData(recipes);
  totalRecipedDisplayed(recipes);

  // affichage de la liste des menus déroulants
  const ingredients = updateIngredientsList("");
  console.log(ingredients);

  displayIngredients(ingredients);
  displayUstansilsList();

  $primarySearch.addEventListener('change', (e) => {
    console.log(e.target.value);
    let target = e.target.value.toLowerCase();
    let query = {
      term: target,
      appliances: [],
      ustensils: ["couteau"],
      ingredients: ["tomate"]
    }
    const result = searchRecipes(query);
    console.log(result);

    // suppression des recettes déjà affichées
    deleteDisplayData();

    // affichage des recettes (selon le mot recherché)
    displayRecipeData(result);

    // calcul du nbre de recettes affichées
    totalRecipedDisplayed(result);
    // resetSearchInput();
  });

});