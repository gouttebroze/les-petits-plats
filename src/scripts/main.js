const $elements = {
  buttonTagIngredients: document.querySelector('.toggle-tag-ingredients'),
  buttonTagAppliances: document.querySelector('.toggle-tag-appliances'),
  buttonTagUstensils: document.querySelector('.toggle-tag-ustensils'),
  closeTagIngredients: document.querySelector('.close-tag-ingredients'),
  closeTagAppliances: document.querySelector('.close-tag-appliances'),
  closeTagUstensils: document.querySelector('.close-tag-ustensils'),
  filter: document.querySelector('.filter-btn'),
  dropdownIngredientsBtn: document.querySelector('.dropdown-ingredients-btn'),
  dropdownAppliancesBtn: document.querySelector('.dropdown-appliances-btn'),
  dropdownUstensilsBtn: document.querySelector('.dropdown-ustensils-btn'),
  filterList: document.querySelector('.filter-list'),
  filterAppliancesList: document.querySelector('.filter-appliances-list'),
  filterUstensilsList: document.querySelector('.filter-ustensils-list'),
  arrowDown: document.querySelector('.arrow-down'),
  arrowDownAppliances: document.querySelector('.arrow-down-appliances'),
  arrowDownUstensils: document.querySelector('.arrow-down-ustensils'),
  arrowUp: document.querySelector('.arrow-up'),
  arrowUpAppliances: document.querySelector('.arrow-up-appliances'),
  arrowUpUstensils: document.querySelector('.arrow-up-ustensils'),
  filterInput: document.querySelector('input[name="ingredient"]'),
  filterInputAppliances: document.querySelector('input[name="appliance"]'),
  filterInputUstensils: document.querySelector('input[name="ustensil"]'),
  inputIcon: document.querySelector('.input-icons'),
  inputAppliancesIcon: document.querySelector('.input-appliances-icons'),
  inputUstensilsIcon: document.querySelector('.input-ustensils-icons'),
  totalRecipesDisplayed: document.querySelector('.total-recipes'),
  recipeSection: document.querySelector('.recipes-wrapper'),
  primarySearch: document.getElementById('primary-search'),
  contentTagAppliances: document.getElementById('content-tag-appliances'),
  contentTagUstensils: document.getElementById('content-tag-ustensils'),
  formSubmit: document.querySelector('#search-form')
};

let $displayRecipesNumber = document.createElement('h3');
$displayRecipesNumber.setAttribute('class', 'recipes-number anton');


/**
 * Displays the list of ingredients in the DOM.
 * 
 * This function creates an unordered list of ingredients and inserts it into the DOM element
 * with the id 'ingredients'. It then calls the onClickToIngredient function to set up event listeners.
 * 
 * @param {string[]} ingredients - An array of ingredient names to be displayed.
 * @returns {void} This function does not return a value.
 */
function displayIngredients(ingredients) {
  const $div = document.querySelector('#ingredients');
  $div.innerHTML = '<ul>' + ingredients.map(ingredient => `<li>${ingredient}</li>`).join('') + '</ul>';
  onClickToIngredient(query);
}


/**
 * Displays the list of appliances in the DOM.
 * 
 * This function creates an unordered list of appliances and inserts it into the DOM element
 * with the id 'appliances'. It then calls the onClickToAppliance function to set up event listeners.
 * 
 * @param {string[]} appliances - An array of appliance names to be displayed.
 * @returns {void} This function does not return a value.
 */
function displayAppliances(appliances) {
  const $div = document.querySelector('#appliances'); // on créé 1 div à partir de l'id "appliances"
  $div.innerHTML = '<ul>' + appliances.map(appliance => `<li>${appliance}</li>`).join('') + '</ul>';
  onClickToAppliance(query);
}


/**
 * display ustensils list
 * @param {string[]} appliances 
 */
function displayUstensils(ustensils) {
  const $div = document.querySelector('#ustensils');
  $div.innerHTML = '<ul>' + ustensils.map(ustensil => `<li>${ustensil}</li>`).join('') + '</ul>';
  onClickToUstensil(query);
}

/** 
 * fn de calcul & d'affichage du nombre de recettes 
 * @param {string[]} recipes - tableau de recettes
 * @param {string} term - recherche de l'utilisateur
 * @returns {number} totalRecipes - nbre de recettes affichés
 */
function totalRecipedDisplayed(recipes, term) {
  let totalRecipes = recipes.length;
  $displayRecipesNumber.querySelector('.recipes-number');
  if (totalRecipes === 0) {
    $displayRecipesNumber.textContent = `Aucune recette ne contient ‘${term}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
  } else {
    $displayRecipesNumber.textContent = `${totalRecipes} recettes`;
  }
  $elements.totalRecipesDisplayed.appendChild($displayRecipesNumber);
  return totalRecipes;
}

/**
 * fn qui vide du DOM le contenu du titre du nbre de recettes affiché
 */
function deleteRecipesNumberTitle() {
  $displayRecipesNumber.querySelector('.recipes-number');
  $displayRecipesNumber.textContent = '';
}

/**
 * Asynchronously displays recipe data by creating and appending recipe cards to the DOM.
 * 
 * This function clears the existing content of the recipe section, then creates and appends
 * a new RecipeCard for each recipe in the provided array.
 *
 * @async
 * @param {Object[]} recipes - An array of recipe objects to be displayed.
 * @returns {Promise<void>} A promise that resolves when all recipe cards have been created and appended.
 */
async function displayRecipeData(recipes) {
  $elements.recipeSection.textContent = '';
  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $elements.recipeSection.appendChild(Template.createRecipeCard());
  })
}


/**
 * fn de nettoyage pour préparer un nouvel affichage, 
 * soit chargée de vider les recettes affichées du DOM
 */
function deleteDisplayData() { }

/**
 * Toggles the arrow icon between down and up states.
 * @param {HTMLElement} element - The element containing the arrow icon.
 */
function toggleArrowIcon(element) {
  if (element.classList.contains('fa-angle-down')) {
    element.classList.remove('fa-angle-down');
    element.classList.add('fa-angle-up');
  } else {
    element.classList.remove('fa-angle-up');
    element.classList.add('fa-angle-down');
  }
}

let query = {
  term: '',
  appliances: [],
  ustensils: [],
  ingredients: []
}

document.addEventListener("DOMContentLoaded", function () {

  // au click sur le btn du dropdown des ingrédients
  $elements.dropdownIngredientsBtn.addEventListener('click', () => {

    // bascule (toggle) entre afficher et cacher la liste des ingrédients
    $elements.filterList.classList.toggle('toggle-display-ingredients');

    // MAJ positions des flèches
    // $elements.arrowDown.classList.toggle('toggle-hide-ingredients');// on cacher la flèche qui pointe vers le bas
    // $elements.arrowUp.classList.toggle('toggle-display-ingredients');// & on affiche la flèche qui pointe vers le haut
    // $arrowUp.style.display = 'block'; //$arrowDown.style.display = 'none';

    /**
     * function to change the appearance of the dropdown menu arrow icon. 
     * It toggle bettween 2 arrows icons with differents directions (one top, other bottom). 
     * Icons indicated whether this dropdown menu is expanded (arrow point to top) or collapsed (to bottom).
     *  
     * function to toggle the class of an HTML element between two states: 
     *    - one with the class `fa-angle-down` 
     *    - and the other with the class `fa-angle-up`. 
     */
    toggleArrowIcon($elements.arrowDown);

    // affichage de l'input qui filtre la liste des ingrédients
    $elements.filterInput.classList.toggle('toggle-display-ingredients');
    $elements.inputIcon.classList.toggle('toggle-flex-ingredients');
    /* $inputIcon.style.display = 'flex';
    $filterInput.style.display = 'block'; */
  });

  $elements.filterList.addEventListener('click', () => {
    $elements.arrowUp.style.display = 'none';
    $elements.arrowDown.style.display = 'block';
  })

  // au click sur le boutton du dropdown des appareils
  $elements.dropdownAppliancesBtn.addEventListener('click', () => {
    $elements.filterAppliancesList.classList.toggle('toggle-display-appliances');
    toggleArrowIcon($elements.arrowDownAppliances);

    $elements.filterInputAppliances.classList.toggle('toggle-display-appliances');
    $elements.inputAppliancesIcon.classList.toggle('toggle-flex-appliances');
  });

  $elements.filterAppliancesList.addEventListener('click', () => {
    $elements.arrowUpAppliances.style.display = 'none'; // on cache la flèche qui pointe vers le haut
    $elements.arrowDownAppliances.style.display = 'block'; // on affiche la flèche qui pointe vers le bas
  })

  $elements.dropdownUstensilsBtn.addEventListener('click', () => {
    $elements.filterUstensilsList.classList.toggle('toggle-display-ustensils');
    toggleArrowIcon($elements.arrowDownUstensils);
    $elements.filterInputUstensils.classList.toggle('toggle-display-ustensils');
    $elements.inputUstensilsIcon.classList.toggle('toggle-flex-ustensils');
  });

  $elements.filterUstensilsList.addEventListener('click', () => {
    $elements.arrowUpUstensils.style.display = 'none';
    $elements.arrowDownUstensils.style.display = 'block';
  })

  displayRecipeData(recipes); // affichage initial du total des recettes (avant recherche)
  totalRecipedDisplayed(recipes); // affichage nbre de recettes affichées

  const ingredients = updateIngredientsList(''); // récupération & MAJ liste ingrédients
  const appliances = updateAppliancesList(''); // récupération & MAJ liste appareils
  const ustensils = updateUstensilsList(''); // récupération & MAJ liste ustensils

  displayIngredients(ingredients); // affichage de la liste des ingrédients
  displayAppliances(appliances); // affichage de la liste des appareils
  displayUstensils(ustensils); // affichage de la liste des ustensils

  $elements.primarySearch.addEventListener('input', (e) => {
    e.preventDefault();
    handleInputSearch(e, query);
  });

  $elements.filterInput.addEventListener('input', (e) => {
    handleFilterInput(e, 'ingredient', updateIngredientsList, displayIngredients, onClickToIngredient);
  });

  $elements.filterInputAppliances.addEventListener('input', (e) => {
    handleFilterInput(e, 'appliance', updateAppliancesList, displayAppliances, onClickToAppliance);
  });

  $elements.filterInputUstensils.addEventListener('input', (e) => {
    handleFilterInput(e, 'ustensil', updateUstensilsList, displayUstensils, onClickToUstensil);
  });
});

/**
 * Handles the search input event, filters recipes based on the input, 
 * and updates the display.
 * 
 * @param {Event} e - The input event object.
 * @param {Object} query - The current query object containing search parameters.
 * @param {string} query.term - The search term.
 * @param {string[]} query.appliances - List of selected appliances.
 * @param {string[]} query.ustensils - List of selected ustensils.
 * @param {string[]} query.ingredients - List of selected ingredients.
 * 
 * @returns {void} This function doesn't return a value, but updates the DOM with filtered recipes.
 */
function handleInputSearch(e, query) {
  let target = e.target.value.toLowerCase();
  query.term = target;
  const result = target.length >= 3 ? filterByReduce(query) : filterByReduce({ ...query, term: '' });
  displayRecipeData(result);
  deleteRecipesNumberTitle();
  totalRecipedDisplayed(result, target);
}


/**
 * Handles the input event for filtering lists (ingredients, appliances, or ustensils).
 * It clears the current list, updates it based on the input, displays the new list, and sets up click events.
 *
 * @param {Event} e - The input event object.
 * @param {string} type - The type of list being filtered ('ingredient', 'appliance', or 'ustensil').
 * @param {Function} updateListFn - Function to update the list based on the input.
 * @param {Function} displayFn - Function to display the updated list.
 * @param {Function} onClickFn - Function to set up click events for the new list items.
 * @returns {void} This function doesn't return a value, but updates the DOM with the filtered list.
 */
function handleFilterInput(e, type, updateListFn, displayFn, onClickFn) {
  const $list = document.querySelectorAll(`#${type}s ul li`);
  $list.forEach(item => item.textContent = '');
  let target = e.target.value.toLowerCase();
  let newList = updateListFn(target);
  displayFn(newList);
  onClickFn();
}
