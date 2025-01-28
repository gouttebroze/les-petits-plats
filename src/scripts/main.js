const $buttonTagIngredients = document.querySelector('.toggle-tag-ingredients');
const $buttonTagAppliances = document.querySelector('.toggle-tag-appliances');
const $buttonTagUstensils = document.querySelector('.toggle-tag-ustensils');
const $closeTagIngredients = document.querySelector('.close-tag-ingredients');
const $closeTagAppliances = document.querySelector('.close-tag-appliances');
const $closeTagUstensils = document.querySelector('.close-tag-ustensils');
const $filter = document.querySelector('.filter-btn');
// const $filterDropdownBtn = document.querySelector('.filter-btn-top');
const $dropdownIngredientsBtn = document.querySelector('.dropdown-ingredients-btn');
// const $filterAppliancesButton = document.querySelector('.dropdown-appliances-btn');
const $dropdownAppliancesBtn = document.querySelector('.dropdown-appliances-btn');
// const $filterUstensilsButton = document.querySelector('.dropdown-ustensils-btn');
const $dropdownUstensilsBtn = document.querySelector('.dropdown-ustensils-btn');
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
// const $contentTagIngredients = document.getElementById('content-tag-ingredients');
const $contentTagAppliances = document.getElementById('content-tag-appliances');
const $contentTagUstensils = document.getElementById('content-tag-ustensils');
/* const $ingredientsList = document.querySelectorAll('#ingredients ul li');
const $ustensilsList = document.querySelectorAll('#ustensils ul li');
const $appliancesList = document.querySelectorAll('#appliances ul li'); */

let $displayRecipesNumber = document.createElement('h3');
$displayRecipesNumber.setAttribute('class', 'recipes-number anton');
const $formSubmit = document.querySelector('#search-form');

/**
 * fn qui gère l'affichage des ingrédients ds le filtre
 * fn qui lance onClickIngredient(), fn qui gère l'affichage des items du filtre selon 
 * les sélections des ingrédients
 * @param {string[]} ingredients 
 */
function displayIngredients(ingredients) {
  const $div = document.querySelector('#ingredients');
  $div.innerHTML = ''
  let $ul = '<ul>';
  for (let i = 0; i < ingredients.length; i++) {
    $ul += `<li>${ingredients[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);
  onClickToIngredient(query);
}

/**
 * display appliances list
 * @param {string[]} appliances 
 */
function displayAppliances(appliances) {
  const $div = document.querySelector('#appliances'); // on créé 1 div à partir de l'id "appliances"
  $div.innerHTML = ''
  // création des tags HTML <ul> & <li>
  let $ul = '<ul>';
  for (let i = 0; i < appliances.length; i++) {
    $ul += `<li>${appliances[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);
  onClickToAppliance(query);
}

/**
 * display ustensils list
 * @param {string[]} appliances 
 */
function displayUstensils(ustensils) {
  const $div = document.querySelector('#ustensils');
  $div.innerHTML = '';
  let $ul = '<ul>';
  for (let i = 0; i < ustensils.length; i++) {
    $ul += `<li>${ustensils[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);
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
  $totalRecipesDisplayed.appendChild($displayRecipesNumber);
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
 * fn d'affichage du template d'1 recette, selon les recettes passées en paramètres
 * TODO tier avec sort par ordre alph.
 * @param {*} recipes 
 */
async function displayRecipeData(recipes) {
  $recipeSection.textContent = '';
  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $recipeSection.appendChild(Template.createRecipeCard());
  })
}

/**
 * fn to clear HTML elements list on filter dropdowns
 * @param {*} list 
 */
/* function resetFilterListDisplay(list) {
  list.forEach((item) => {
    console.log(item);
    return item.textContent = '';
  })
} */

/**
 * fn de nettoyage pour préparer un nouvel affichage, 
 * soit chargée de vider les recettes affichées du DOM
 */
function deleteDisplayData() { }

let query = {
  term: '',
  appliances: [],
  ustensils: [],
  ingredients: []
}

document.addEventListener("DOMContentLoaded", function () {

  // au click sur le btn du dropdown des ingrédients
  $dropdownIngredientsBtn.addEventListener('click', () => {

    // bascule (toggle) entre afficher et cacher la liste des ingrédients
    $filterList.classList.toggle('toggle-display-ingredients');

    // MAJ positions des flèches
    $arrowDown.classList.toggle('toggle-hide-ingredients');// on cacher la flèche qui pointe vers le bas
    $arrowUp.classList.toggle('toggle-display-ingredients');// & on affiche la flèche qui pointe vers le haut
    // $arrowUp.style.display = 'block'; //$arrowDown.style.display = 'none';

    // affichage de l'input qui filtre la liste des ingrédients
    $filterInput.classList.toggle('toggle-display-ingredients');
    $inputIcon.classList.toggle('toggle-flex-ingredients');
    /* $inputIcon.style.display = 'flex';
    $filterInput.style.display = 'block'; */
  });

  $filterList.addEventListener('click', () => {
    $arrowUp.style.display = 'none';
    $arrowDown.style.display = 'block';
  })

  // au click sur le boutton du dropdown des appareils
  $dropdownAppliancesBtn.addEventListener('click', () => {
    $filterAppliancesList.classList.toggle('toggle-display-appliances');
    $arrowDownAppliances.style.display = 'none'; // on cacher la flèche qui pointe vers le bas
    $arrowUpAppliances.style.display = 'block'; // & on affiche la flèche qui pointe vers le haut
    $filterInputAppliances.classList.toggle('toggle-display-appliances');
    $inputAppliancesIcon.classList.toggle('toggle-flex-appliances');
  });

  $filterAppliancesList.addEventListener('click', () => {
    $arrowUpAppliances.style.display = 'none'; // on cache la flèche qui pointe vers le haut
    $arrowDownAppliances.style.display = 'block'; // on affiche la flèche qui pointe vers le bas
  })

  $dropdownUstensilsBtn.addEventListener('click', () => {
    $filterUstensilsList.classList.toggle('toggle-display-ustensils');
    $arrowDownUstensils.style.display = 'none';
    $arrowUpUstensils.style.display = 'block';
    $filterInputUstensils.classList.toggle('toggle-display-ustensils');
    $inputUstensilsIcon.classList.toggle('toggle-flex-ustensils');
  });

  $filterUstensilsList.addEventListener('click', () => {
    $arrowUpUstensils.style.display = 'none';
    $arrowDownUstensils.style.display = 'block';
  })

  displayRecipeData(recipes); // affichage initial du total des recettes (avant recherche)
  totalRecipedDisplayed(recipes); // affichage nbre de recettes affichées

  const ingredients = updateIngredientsList(''); // récupération & MAJ liste ingrédients
  const appliances = updateAppliancesList(''); // récupération & MAJ liste appareils
  const ustensils = updateUstensilsList(''); // récupération & MAJ liste ustensils

  displayIngredients(ingredients); // affichage de la liste des ingrédients
  displayAppliances(appliances); // affichage de la liste des appareils
  displayUstensils(ustensils); // affichage de la liste des ustensils

  function handleInputSearch(e, query) {
    let target = e.target.value.toLowerCase();
    query.term = target;
    const result = searchRecipes(query);
    if (target.length >= 3) {
      displayRecipeData(result); // reload recipes to displayed on every new character enter
      deleteRecipesNumberTitle(); // remove title with displayed recipes count
      totalRecipedDisplayed(result, target); // display how many recipes are displayed 
    } else {
      query.term = ''; // with an empty query
      const result = searchRecipes(query);
      displayRecipeData(result);
      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result, target);
    }
  }

  $primarySearch.addEventListener('input', (e) => {
    e.preventDefault();
    let target = e.target.value.toLowerCase();
    query.term = target;
    // const result = searchRecipes(query);
    const result = filterByReduce(query);
    // console.log(searchByArrayObjects(query));
    // Array object function
    // const result = filterByReduce(query);
    // const result = searchByArrayObjects(query);

    if (target.length >= 3) {
      // if input field text contains 3 or more characters, do it
      displayRecipeData(result); // reload recipes to displayed on every new character enter
      deleteRecipesNumberTitle(); // remove title with displayed recipes count
      totalRecipedDisplayed(result, target); // display how many recipes are displayed 
    } else {
      query.term = ''; // with an empty query
      // const result = searchRecipes(query);
      // const result = searchByArrayObjects(query);
      const result = filterByReduce(query);
      displayRecipeData(result);
      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result, target);
    }
  });

  /**
   * input - filter by ingredient 
   */
  $filterInput.addEventListener('input', (e) => {

    // clear HTML elements list
    // resetFilterListDisplay($ingredientsList);
    const $list = document.querySelectorAll('#ingredients ul li');
    $list.forEach((item) => {
      return item.textContent = '';
    })

    // display new list with elements that includes target
    let target = e.target.value.toLowerCase();
    let newList = updateIngredientsList(target);
    displayIngredients(newList);
    console.log(updateIngredientsList(target));
    onClickToIngredient();
  });

  /**
   * input - filter by appliance
   */
  $filterInputAppliances.addEventListener('input', (e) => {
    // clear HTML elements list
    //resetFilterListDisplay($appliancesList);
    const $list = document.querySelectorAll('#appliances ul li');
    $list.forEach((item) => {
      return item.textContent = '';
    })
    let target = e.target.value.toLowerCase();
    let newList = updateAppliancesList(target);
    displayAppliances(newList);
    onClickToAppliance();
  });

  /**
   * input - filter by ustensil
   */
  $filterInputUstensils.addEventListener('input', (e) => {
    // clear HTML elements list
    //resetFilterListDisplay($ustensilsList);
    const $list = document.querySelectorAll('#ustensils ul li');
    $list.forEach((item) => {
      return item.textContent = '';
    })
    let target = e.target.value.toLowerCase();
    let newList = updateUstensilsList(target);

    // affichage de la nouvelle liste d'ustensils
    displayUstensils(newList);

    onClickToUstensil();
  });
});