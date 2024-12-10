import { recipes } from './recipes';
import RecipeCard from './recipeCard.js';
import { searchRecipes } from './nativeLoops.js';

// séparer les constantes ds 1 autre fichier
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

let $displayRecipesNumber = document.createElement('h3');
$displayRecipesNumber.setAttribute('class', 'recipes-number anton');

/** 
 * recupère & MAJ la liste des ingrédients, sans doublons.
 * @property {string} term
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

function updateUstensilsList(term) {
  let updatedUstensils = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
      if (recipes[i].ustensils[j].toLowerCase().includes(term.toLowerCase())) {
        updatedUstensils.push(recipes[i].ustensils[j].toLowerCase());
      }
    }
  }
  // suppression d'éventuels doublons
  let uniqueUstensils = [];
  for (let i = 0; i < updatedUstensils.length; i++) {
    const ustensilIndex = updatedUstensils.indexOf(updatedUstensils[i]);
    // indexOf() récupère l'index et, en cas de doublon, récupère uniquement le 1er index de(s) l'élément(s) trouvé(s)
    if (i === ustensilIndex) {
      uniqueUstensils.push(updatedUstensils[i]);
    }
  }
  return uniqueUstensils;
}

/**
 * fonction qui génère une liste (un template HTML (<ul> > <li>))
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

  // click sur 1 ingrédient le supprime de la liste
  $filter.addEventListener('click', () => {
    $filterList.style.display = 'block';
    $arrowDown.style.display = 'none';
    $arrowUp.style.display = 'block';
    $filterInput.style.display = 'block';
    $inputIcon.style.display = 'flex';
  });
  $filterList.addEventListener('click', () => {
    //$buttonTagIngredients.style.display = 'block';
    $filterList.style.display = 'none';
    $arrowUp.style.display = 'none';
    $arrowDown.style.display = 'block';
    $filterInput.style.display = 'none';
    $inputIcon.style.display = 'none';
  })

  // click sur le btn close du tag l'ajoute à la liste
  /* $closeTagIngredients.addEventListener('click', () => {
    $buttonTagIngredients.style.display = 'none';
  }) */
}

/**
 * display appliances list
 * @param {string[]} appliances 
 */
function displayAppliances(appliances) {
  const $div = document.querySelector('#appliances'); // on créé 1 div à partir de l'id "appliances"

  // création des tags HTML <ul> & <li>
  let $ul = '<ul>';
  for (let i = 0; i < appliances.length; i++) {
    $ul += `<li>${appliances[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);

  // au click sur le boutton du dropdown des appareils
  $filterAppliancesButton.addEventListener('click', () => {

    // on affiche la liste des appareils
    $filterAppliancesList.style.display = 'block';

    // on passe le btn en position ouvert
    $arrowDownAppliances.style.display = 'none'; // on cacher la flèche qui pointe vers le bas
    $arrowUpAppliances.style.display = 'block'; // & on affiche la flèche qui pointe vers le haut

    // affichage de l'input du filtre des appareil
    $filterInputAppliances.style.display = 'block'; // on affiche l'input
    $inputAppliancesIcon.style.display = 'flex'; // on affiche l'icône "loupe" de l'input
  });

  // au click sur 1 élement de la liste du dropdown des appareils
  $filterAppliancesList.addEventListener('click', () => {

    // on affiche le tag
    //$buttonTagAppliances.style.display = 'block';

    // on cache la liste
    $filterAppliancesList.style.display = 'none';

    // on passe le btn en position fermée
    $arrowUpAppliances.style.display = 'none'; // on cache la flèche qui pointe vers le haut
    $arrowDownAppliances.style.display = 'block'; // on affiche la flèche qui pointe vers le bas

    // désaffichage de l'input du filtre des appareil
    $filterInputAppliances.style.display = 'none'; // on cache l'input
    $inputAppliancesIcon.style.display = 'none'; // on cache la loupe
  })

  // event listener on tag's arrow (to close tag & re-push element into filter list)
  $closeTagAppliances.addEventListener('click', () => {
    $buttonTagAppliances.style.display = 'none';
  })
}

/**
 * display ustensils list
 * @param {string[]} appliances 
 */
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
 * TODO: séparer la logique de calcul de celle d'affichage
 * fn de calcul & d'affichage du nombre de recettes 
 * @param {string[]} recipes - tableau de recettes
 * @returns {number} totalRecipes - taille du tableau, soit le nbre de recettes affichés
 */

function totalRecipedDisplayed(recipes) {
  let totalRecipes = recipes.length;
  /* let $displayRecipesNumber = document.createElement('h3');
  $displayRecipesNumber.setAttribute('class', 'recipes-number anton'); */
  $displayRecipesNumber.querySelector('.recipes-number');
  $displayRecipesNumber.textContent = `${totalRecipes} recettes`;
  $totalRecipesDisplayed.appendChild($displayRecipesNumber);
  return totalRecipes;
}

function deleteRecipesNumberTitle() {
  $displayRecipesNumber.querySelector('.recipes-number');
  $displayRecipesNumber.textContent = '';
}

async function displayRecipeData(recipes) {
  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $recipeSection.appendChild(Template.createRecipeCard());
  })
}

function deleteDisplayData() {
  $recipeSection.textContent = '';
  // document.querySelector('.recipes-number').textContent = '';
}

document.addEventListener("DOMContentLoaded", function () {

  displayRecipeData(recipes); // affichage initial du total des recettes (avant recherche)
  totalRecipedDisplayed(recipes); // affichage nbre de recettes affichées

  // affichage de la liste des menus déroulants
  const ingredients = updateIngredientsList(''); // récupération & MAJ liste ingrédients
  const appliances = updateAppliancesList(''); // récupération & MAJ liste appareils
  const ustensils = updateUstensilsList(''); // récupération & MAJ liste ustensils

  console.table(ingredients);
  console.table(appliances);
  console.table(ustensils);

  displayIngredients(ingredients); // affichage de la liste des ingrédients
  displayAppliances(appliances); // affichage de la liste des appareils
  displayUstensils(ustensils); // affichage de la liste des ustensils

  /**
   * recherche principale
   * voir Event "input": 
   *  - relance la recherche à chaque frappe
   *  - mais il faut doit relancer la recherche qu'à partir 3 charatères entrés ds le champs
   */

  let query = {
    term: '',
    appliances: [],
    ustensils: [],
    ingredients: []
  }
  $primarySearch.addEventListener('input', (e) => {
    let target = e.target.value.toLowerCase();
    query.term = target;
    const result = searchRecipes(query);
    console.log('recherche principale:', result, 'nbr char.: ', target.length);
    deleteDisplayData(); // suppression des recettes affichées
    displayRecipeData(result); // affichage des nouvelles recettes
    deleteRecipesNumberTitle(); // supprime précédent titre de total du nbre de recettes
    totalRecipedDisplayed(result); // affiche nbre total de recettes
  });

  // on écoute au click: MAJ des recettes + MAJ des 3 listes en fonction du tag sélectionné
  const $ingredientsList = Array.from(document.querySelectorAll('#ingredients ul li'));
  $ingredientsList.forEach((ingredient) => {
    ingredient.addEventListener("click", (e) => {

      // on crée le tag HTML (création dynamique qui permet de générer 1 nouveau tag à chaque clic sur 1 ingrédient)
      const $tagsWrapper = document.querySelector('.ingredients-tags-wrapper');
      const $tagButton = document.createElement('button');
      const $spanParentText = document.createElement('span');
      const $spanChildText = document.createElement('span');
      const $closingTagBtn = document.createElement('button');
      $spanParentText.classList.add('d-flex');
      $spanParentText.classList.add('justify-content-around');
      $spanChildText.setAttribute('id', 'content-tag-ingredients')
      $tagButton.classList.add('button-tag');
      $tagButton.classList.add('show-tag-ingredients');
      $closingTagBtn.textContent = 'X'; // à remplacer par 1 croix (icône "close")
      $spanChildText.textContent = e.target.textContent; // injection du nom de l'ingrédient ds le tag
      const target = e.target.textContent.toLowerCase();
      $tagsWrapper.appendChild($tagButton);
      $tagButton.appendChild($spanParentText);
      $spanParentText.appendChild($spanChildText);
      $spanParentText.appendChild($closingTagBtn);

      //$buttonTagIngredients.style.display = 'block'; // affichage du tag en réation au click sur l'élement de la liste
      // $contentTagIngredients.textContent = e.target.textContent;

      // on pousse l'élément target ds le tableau des ingrédients
      query.ingredients.push(target);

      const result = searchRecipes(query);

      // suppression des recettes affichées (nettoyage avant d'afficher une nouvelle liste de recettes)
      deleteDisplayData();

      // fn d'affichage des recettes
      displayRecipeData(result);

      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result);
      console.log('filtre par ingredients : ', result);

      // todo ds cette fn: MAJ les élements des 2 autres listes en fonction de l'ingredient sélectionné
      // utiliser la fn updateIngredientsList() ms avec un 2eme paramètre
    })
  })

  const $appliancesList = Array.from(document.querySelectorAll('#appliances ul li'));
  $appliancesList.forEach((appliance) => {
    appliance.addEventListener("click", (e) => {
      $buttonTagAppliances.style.display = 'block';
      $contentTagAppliances.textContent = e.target.textContent;
      const target = e.target.textContent.toLowerCase();
      query.appliances.push(target);
      const result = searchRecipes(query); /* fn combineles résultats des recherches (relance recherche principale & autres recherches) */
      deleteDisplayData();
      displayRecipeData(result);
      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result);
      console.log('filtre par appareils : ', result);

      // déplacer l'élement clické en haut de la liste
      // soit tt en CSS, soit on le déplace au début du tableau en 1er element
    })
  })

  // utiliser methode filter() pr supprimer & ajouter à la liste l'element clické 
  const $ustensilsList = Array.from(document.querySelectorAll('#ustensils ul li'));
  $ustensilsList.forEach((ustensil) => {
    ustensil.addEventListener("click", (e) => {
      $buttonTagUstensils.style.display = 'block';
      $contentTagUstensils.textContent = e.target.textContent;
      const target = e.target.textContent;
      query.ustensils.push(target);

      const result = searchRecipes(query);
      deleteDisplayData();
      displayRecipeData(result);
      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result);
      console.log('filtre par ustensils: ', result);


    })
  })

  // input: MAJ du contenu de la liste du filtre
  /**
   * input - filter by ingredient 
   * la liste des ingredients est MAJ, filtré pr correspondre à la recherche
   * si input "coco", les ingredients de la liste doivent correspondre 
   * aux ingredients contenus ds les recettes "coco" ??? à vérifier
   */
  $filter.addEventListener('change', (e) => {
    let target = e.target.value.toLowerCase();
    // query.ingredients.push(target);

    const result = searchRecipes(query);
    deleteDisplayData();
    displayRecipeData(result);
    totalRecipedDisplayed(result);
  });

  /**
   * input - filter by appliance
   */
  $filterInputAppliances.addEventListener('change', (e) => {
    let target = e.target.value.toLowerCase();
    let query = {
      term: target,
      appliances: [],
      ustensils: [],  // 'verres'
      ingredients: [] // 
    }
    const result = searchRecipes(query);
    deleteDisplayData();
    displayRecipeData(result);
    totalRecipedDisplayed(result);
  });

  /**
   * input - filter by ustensil
   */
  // ne fonctionne pas
  $filterInputUstensils.addEventListener('change', (e) => {
    let target = e.target.value.toLowerCase();
    let query = {
      term: target,
      appliances: [],
      ustensils: [],  //'verres'
      ingredients: []  // 
    }
    const result = searchRecipes(query);
    console.log(result);
    deleteDisplayData();
    displayRecipeData(result);
    totalRecipedDisplayed(result);
  });
});