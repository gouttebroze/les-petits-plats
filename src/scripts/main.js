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
const $recipeSection = document.querySelector('.recipes-wrapper');

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
function totalRecipedDisplayed() {
  let totalRecipes = recipes.length;
  let $displayRecipesNumber = document.createElement('h3');
  $displayRecipesNumber.setAttribute('class', 'recipes-number anton');
  $displayRecipesNumber.textContent = `${totalRecipes} recettes`;
  $totalRecipesDisplayed.appendChild($displayRecipesNumber);
  return totalRecipes;
}

totalRecipedDisplayed();

// const allRecipes = recipes.flatMap((r) => r.ingredients);

function searchRecipes(term) {
  let newRecipes = [];
  for (let i = 0; i <= recipes.length; i++) {
    if (term === recipes[i]?.name || term === recipes[i]?.description) {
      newRecipes.push(recipes[i]);
      continue;
    }
    for (let j = 0; j <= recipes[i]?.ingredients.length; j++) {
      if (term === recipes[i]?.ingredients[j]?.ingredient) {
        newRecipes.push(recipes[i]);
      }
    }
  }
  return newRecipes;
}
console.log(searchRecipes('Brownie'));
console.log(searchRecipes('Courgette'));
console.log(searchRecipes('Raper'));

const $primarySearch = document.getElementById('primary-search');




async function displayRecipeData(recipes) {

  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $recipeSection.appendChild(Template.createRecipeCard());
  })
}

function displaySortedReciped() {
  let sortedRecipes = document.querySelector('input[type=text]').value;
  searchRecipes(sortedRecipes);
}

function deleteDisplayRecipes() {
  $recipeSection.innerHTML = '';
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
    if (substring === recipes[i]?.name.includes(substring) || 'faire' === recipes[i]?.description.includes('faire')) {
      sortedRecipes.push(recipes[i]);
      continue;
    }
    /* for (let j = 0; j <= recipes[i]?.ingredients.length; j++) {
      if (substring === recipes[i]?.ingredients[j]?.ingredient.includes(substring)) {
        sortedRecipes.push(recipes[i]);
      }
    } */
  }
  return sortedRecipes;
}
console.log(searchSubStringsInRecipes('Raper'));

document.addEventListener("DOMContentLoaded", function () {
  // init();
  displayRecipeData(recipes);

  $primarySearch.addEventListener('change', (e) => {
    const $recipeSection = document.querySelector('.recipes-wrapper');
    console.log(e.target.value);
    let target = e.target.value;
    searchRecipes(target);
    console.log(searchRecipes(target));
    // il faut supprimer les recettes déjà affichées, puis on affiche les recettes triées
    deleteDisplayRecipes();
    displayRecipeData(searchRecipes(target));
  });

});