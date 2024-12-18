import { recipes } from './recipes';
import RecipeCard from './recipeCard.js';
import { searchRecipes } from './nativeLoops.js';
import { filterByReduceMethod } from './arrayObject.js';

const $buttonTagIngredients = document.querySelector('.toggle-tag-ingredients');
const $buttonTagAppliances = document.querySelector('.toggle-tag-appliances');
const $buttonTagUstensils = document.querySelector('.toggle-tag-ustensils');
const $closeTagIngredients = document.querySelector('.close-tag-ingredients');
const $closeTagAppliances = document.querySelector('.close-tag-appliances');
const $closeTagUstensils = document.querySelector('.close-tag-ustensils');
const $filter = document.querySelector('.filter-btn');
const $filterAppliancesButton = document.querySelector('.filter-appliances-btn');
const $filterUstensilsButton = document.querySelector('.filter-ustensils-btn');
const $filterList = document.querySelector('.filter-list');
const $filterAppliancesList = document.querySelector('.filter-appliances-list');
const $filterUstensilsList = document.querySelector('.filter-ustensils-list');
const $arrowDown = document.querySelector('.arrow-down');
const $arrowDownAppliances = document.querySelector('.arrow-down-appliances');
const $arrowDownUstensils = document.querySelector('.arrow-down-ustensils');
const $arrowUp = document.querySelector('.arrow-up');
const $arrowUpAppliances = document.querySelector('.arrow-up-appliances');
const $arrowUpUstensils = document.querySelector('.arrow-up-ustensils');
const $filterInput = document.querySelector('input[name="ingredient"]');
const $filterInputAppliances = document.querySelector('input[name="appliance"]');
const $filterInputUstensils = document.querySelector('input[name="ustensil"]');
const $inputIcon = document.querySelector('.input-icons');
const $inputAppliancesIcon = document.querySelector('.input-appliances-icons');
const $inputUstensilsIcon = document.querySelector('.input-ustensils-icons');
const $totalRecipesDisplayed = document.querySelector('.total-recipes');
const $recipeSection = document.querySelector('.recipes-wrapper');
const $primarySearch = document.getElementById('primary-search');
const $contentTagIngredients = document.getElementById('content-tag-ingredients');
const $contentTagAppliances = document.getElementById('content-tag-appliances');
const $contentTagUstensils = document.getElementById('content-tag-ustensils');

/** 
 * fonction permettant de récupérer et de mettre à jour la liste des ingrédients, sans doublons, selon le terme de la recherche.
 * La boucle "for" nous permet de parcourir les différents niveaux du tableau de recettes afin d'y récupérer la liste des ingrédients.
 * @property {string} term - Le terme de recherche saisi par l'utilisateur.
 * @returns {void}
 */
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
    const ingredientIndex = updatedIngredients.indexOf(updatedIngredients[i]);
    if (i === ingredientIndex) {
      uniqueIngredients.push(updatedIngredients[i]);
    }
  }
  return uniqueIngredients;
}

function updateAppliancesList(term) {
  let updatedAppliances = [];
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].appliance.toLowerCase().includes(term.toLowerCase())) {
      updatedAppliances.push(recipes[i].appliance.toLowerCase());
    }
  }
  let uniqueAppliances = [];
  for (let i = 0; i < updatedAppliances.length; i++) {
    const applianceIndex = updatedAppliances.indexOf(updatedAppliances[i]);
    if (i === applianceIndex) {
      uniqueAppliances.push(updatedAppliances[i]);
    }
  }
  return uniqueAppliances;
}

/* function updateAppliancesList(term) {
  //let updatedAppliances = [];
  // return recipes.filter((recipe) => recipe.appliance.toLowerCase().includes(term.toLowerCase()));
  let updatedAppliances = recipes.map(recipe => recipe.appliance.toLowerCase().includes(term.toLowerCase()));
  return updatedAppliances;
} */

function updateUstensilsList(term) {
  let updatedUstansils = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
      if (recipes[i].ustensils[j].toLowerCase().includes(term.toLowerCase())) {
        updatedUstansils.push(recipes[i].ustensils[j].toLowerCase());
      }
    }
  }
  // suppression d'éventuels doublons
  let uniqueUstansils = [];
  for (let i = 0; i < updatedUstansils.length; i++) {
    const ustensilIndex = updatedUstansils.indexOf(updatedUstansils[i]);
    // indexOf() récupère l'index et, en cas de doublon, récupère uniquement le 1er index de(s) l'élément(s) trouvé(s)
    if (i === ustensilIndex) {
      uniqueUstansils.push(updatedUstansils[i]);
    }
  }
  return uniqueUstansils;
}

/**
 * fonction qui génère un template HTML (<ul> > <li>)
 * @param {string[]} ingredients 
 */
function displayIngredients(ingredients) {
  const $div = document.querySelector('#ingredients');
  let $ul = '<ul>';
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
    $buttonTagIngredients.style.display = 'block';
    $filterList.style.display = 'none';
    $arrowUp.style.display = 'none';
    $arrowDown.style.display = 'block';
    $filterInput.style.display = 'none';
    $inputIcon.style.display = 'none';
  })
  $closeTagIngredients.addEventListener('click', () => {
    $buttonTagIngredients.style.display = 'none';
  })
}

function displayAppliances(appliances) {
  const $div = document.querySelector('#appliances');
  let $ul = '<ul>';
  for (let i = 0; i < appliances.length; i++) {
    $ul += `<li>${appliances[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);

  $filterAppliancesButton.addEventListener('click', () => {
    $filterAppliancesList.style.display = 'block';
    $arrowDownAppliances.style.display = 'none';
    $arrowUpAppliances.style.display = 'block';
    $filterInputAppliances.style.display = 'block';
    $inputAppliancesIcon.style.display = 'flex';
  });

  $filterAppliancesList.addEventListener('click', () => {
    $buttonTagAppliances.style.display = 'block';
    $filterAppliancesList.style.display = 'none';
    $arrowUpAppliances.style.display = 'none';
    $arrowDownAppliances.style.display = 'block';
    $filterInputAppliances.style.display = 'none';
    $inputAppliancesIcon.style.display = 'none';
  })
  $closeTagAppliances.addEventListener('click', () => {
    $buttonTagAppliances.style.display = 'none';
  })
}

function displayUstensils(ustensils) {
  const $div = document.querySelector('#ustensils');
  let $ul = '<ul>';
  for (let i = 0; i < ustensils.length; i++) {
    $ul += `<li>${ustensils[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);

  $filterUstensilsButton.addEventListener('click', () => {
    $filterUstensilsList.style.display = 'block';
    $arrowDownUstensils.style.display = 'none';
    $arrowUpUstensils.style.display = 'block';
    $filterInputUstensils.style.display = 'block';
    $inputUstensilsIcon.style.display = 'flex';
  });

  $filterUstensilsList.addEventListener('click', () => {
    $buttonTagUstensils.style.display = 'block';
    $filterUstensilsList.style.display = 'none';
    $arrowUpUstensils.style.display = 'none';
    $arrowDownUstensils.style.display = 'block';
    $filterInputUstensils.style.display = 'none';
    $inputUstensilsIcon.style.display = 'none';
  })
  $closeTagUstensils.addEventListener('click', () => {
    $buttonTagUstensils.style.display = 'none';
  })
}

/**
 * fn de calcul & d'affichage:
 *  - du nombre de recettes affichées
 *  - de l'affichage de ce nombre
 * TODO: séparer la logique de calcul de celle d'affichage (créer 2 fns, pr que chaque fn ai une & une seul responsable)
 * @param {string[]} recipes 
 * @returns {number} totalRecipes - taille du tableau de recettes passé en paramètre
 */
function totalRecipedDisplayed(recipes) {
  let totalRecipes = recipes.length;
  let $displayRecipesNumber = document.createElement('h3');
  $displayRecipesNumber.setAttribute('class', 'recipes-number anton');
  $displayRecipesNumber.textContent = `${totalRecipes} recettes`;
  $totalRecipesDisplayed.appendChild($displayRecipesNumber);
  return totalRecipes;
}

function calculResultsElements(results) {
  let arrayLength = results.length;
  return arrayLength;
}

function displayRecipesNumber(resultsNumbers) {
  let $displayRecipesNumber = document.createElement('h3');
  $displayRecipesNumber.setAttribute('class', 'recipes-number anton');
  $displayRecipesNumber.textContent = `${totalRecipes} recettes`;
  $totalRecipesDisplayed.appendChild($displayRecipesNumber);
}

/**
 * fn to display recipes
 * @param {*} recipes 
 */
async function displayRecipeData(recipes) {
  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $recipeSection.appendChild(Template.createRecipeCard());
  })
}

function deleteDisplayData() {
  $recipeSection.textContent = '';
  document.querySelector('.recipes-number').textContent = '';
}

function resetSearchInput() {
  $searchForm = document.querySelector('.search-input');
  $searchForm.innerHTML = '';
}

document.addEventListener("DOMContentLoaded", function () {

  console.log(filterByReduceMethod('courgette'));

  // affichage initial, avec tableau de recettes complet
  displayRecipeData(recipes);
  totalRecipedDisplayed(recipes);

  // affichage de la liste des menus déroulants
  /* const ingredients = updateIngredientsList('');
  const appliances = updateAppliancesList('');
  const ustensils = updateUstensilsList('');
  console.table(ingredients);
  console.table(appliances);
  console.table(ustensils);
  displayIngredients(ingredients);
  displayAppliances(appliances);
  displayUstensils(ustensils); */

  /**
   * recherche principale
   */
  $primarySearch.addEventListener('change', (e) => {
    // console.log(filterByReduceMethod('fraise'));
    let target = e.target.value.toLowerCase();
    //let arrTarg = Array.of(target);
    console.log(target);

    /* let query = {
      term: target,
      appliances: [],
      ustensils: [],
      ingredients: ['citron']
    }
    // const result = searchRecipes(query);
    const result = filterByReduceMethod(query);
    console.log(result); */

    // suppression des recettes déjà affichées
    deleteDisplayData();

    // affichage des recettes (selon le mot recherché)
    // displayRecipeData(result);

    /**
     * fn d'affichage des recettes, 
     * pernnant en paramètre une fn de recherche de correspondances entre l'occurence soumise dans l'input, 
     * & les valeurs trouvées parcourant le tab. de recettes 
     * on recherche les égalités ds le tableau "recipes", 
     * entre les valeurs des objets{} "nom", "description" & le tableau "ingredients" (tab. multi-dimensionnel) 
     * & avec l'occurence soumise dans l'input
     * fn utilisant les methodes de l'objet Array (.reduce())
     */
    displayRecipeData(filterByReduceMethod(target));

    // calcul du nbre de recettes affichées
    // totalRecipedDisplayed(result);
    totalRecipedDisplayed(recipes);

    // resetSearchInput();
  });

  // inject element name on click, into button tag
  const $ingredientsList = Array.from(document.querySelectorAll('#ingredients ul li'));
  console.log($ingredientsList); // return nodeList of <li>
  $ingredientsList.forEach((li) => {
    li.addEventListener("click", (e) => {

      // au lieu d'afficher btn, le / les créer pr en afficher plusieurs
      $buttonTagIngredients.style.display = 'block';
      $contentTagIngredients.textContent = e.target.textContent;
    })
  })

  const $ustensilsList = Array.from(document.querySelectorAll('#ustensils ul li'));
  console.log($ustensilsList);
  $ustensilsList.forEach((li) => {
    li.addEventListener("click", (e) => {
      $buttonTagUstensils.style.display = 'block';
      $contentTagUstensils.textContent = e.target.textContent;
    })
  })

  const $appliancesList = Array.from(document.querySelectorAll('#appliances ul li'));
  console.log($appliancesList);
  $appliancesList.forEach((li) => {
    li.addEventListener("click", (e) => {
      $buttonTagAppliances.style.display = 'block';
      $contentTagAppliances.textContent = e.target.textContent;
    })
  })

  /*****************************************
   * Dropdown - to display filters recipes 
   *****************************************/
  /**
   * filter by ingredient
   */
  /* $filter.addEventListener('change', (e) => {
    let target = e.target.value.toLowerCase();
    let query = {
      term: target,
      appliances: [],
      ustensils: [],
      ingredients: ['citron'] // preciser un ingredient pr avoir des résultats (ok, fonctionne)
    }
    const result = searchRecipes(query);
    deleteDisplayData();
    displayRecipeData(result);
    totalRecipedDisplayed(result);
  }); */

  /**
   * filter by appliance
   */
  /* $filterInputAppliances.addEventListener('change', (e) => {
    let target = e.target.value.toLowerCase();
    let query = {
      term: target,
      appliances: [],
      ustensils: [],
      ingredients: ['citron']
    }
    const result = searchRecipes(query);
    deleteDisplayData();
    displayRecipeData(result);
    totalRecipedDisplayed(result);
  }); */

  /**
   * filter by ustensil
   */
  /* $filterInputUstensils.addEventListener('change', (e) => {
    let target = e.target.value.toLowerCase();
    let query = {
      term: target,
      appliances: [],
      ustensils: [],
      ingredients: ['citron']
    }
    const result = searchRecipes(query);
    console.log(result);
    deleteDisplayData();
    displayRecipeData(result);
    totalRecipedDisplayed(result);
  }); */
});