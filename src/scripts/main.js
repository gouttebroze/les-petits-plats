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

let $displayRecipesNumber = document.createElement('h3');
$displayRecipesNumber.setAttribute('class', 'recipes-number anton');
const $formSubmit = document.querySelector('#search-form');

/**
 * fn permettant de restaurer les valeurs par défaut
 * @param {HTMLFormElement} element - formulaire
 */
function resetForm(element) {
  element.reset();
}

/** 
 * @property {string} term
 * @property {string[]} recipes - listes à MAJ (celle des appareils & des 
 * ustensils en fonction des recettes générées par le term)
 * @returns {void}
 */
export function updateIngredientsList(term, _recipes = recipes) {
  let updatedIngredients = [];
  // let ingredientsFilter = [];
  for (let i = 0; i < _recipes.length; i++) {
    for (let j = 0; j < _recipes[i].ingredients.length; j++) {
      if (_recipes[i].ingredients[j].ingredient.toLowerCase().includes(term.toLowerCase())) {
        updatedIngredients.push(_recipes[i].ingredients[j].ingredient.toLowerCase());
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

export function updateAppliancesList(term, _recipes = recipes) {
  let updatedAppliances = [];
  for (let i = 0; i < _recipes.length; i++) {
    if (_recipes[i].appliance.toLowerCase().includes(term.toLowerCase())) {
      updatedAppliances.push(_recipes[i].appliance.toLowerCase());
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

export function updateUstensilsList(term, _recipes = recipes) {
  let updatedUstensils = [];
  for (let i = 0; i < _recipes.length; i++) {
    for (let j = 0; j < _recipes[i].ustensils.length; j++) {
      if (_recipes[i].ustensils[j].toLowerCase().includes(term.toLowerCase())) {
        updatedUstensils.push(_recipes[i].ustensils[j].toLowerCase());
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
export function displayIngredients(ingredients) {
  const $div = document.querySelector('#ingredients');
  // $div.innerHTML = ''
  let $ul = '<ul>';
  for (let i = 0; i < ingredients.length; i++) {
    $ul += `<li>${ingredients[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);

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

  /* au click sur 1 élement de la liste des ingrédients 
     comportement à vérifier: 
     la liste est caché au click sur le btn d'ouverture ? (et non sur un des item?)
  */
  $filterList.addEventListener('click', () => {
    /* non, l'affichage du tag sera géré par 1 autre fn, tout comme ses autres comportements, 
    tel que l'injection du texte, le changement de position de l'item, la fermeture du tag ...) */
    // $buttonTagIngredients.style.display = 'block';
    // $filterList.style.display = 'none';

    // MAJ positions des flèches
    $arrowUp.style.display = 'none';
    $arrowDown.style.display = 'block';

    // on cache l'input & l'icône "loupe" (action à lancer avec la fermeture de la liste)
    /* $filterInput.style.display = 'none';
    $inputIcon.style.display = 'none'; */
  })
}

/**
 * display appliances list
 * @param {string[]} appliances 
 */
export function displayAppliances(appliances) {
  const $div = document.querySelector('#appliances'); // on créé 1 div à partir de l'id "appliances"
  //$div.innerHTML = ''
  // création des tags HTML <ul> & <li>
  let $ul = '<ul>';
  for (let i = 0; i < appliances.length; i++) {
    $ul += `<li>${appliances[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);

  // au click sur le boutton du dropdown des appareils
  $dropdownAppliancesBtn.addEventListener('click', () => {
    // bascule (toggle) entre afficher et cacher la liste des appareils
    $filterAppliancesList.classList.toggle('toggle-display-appliances');

    // on passe le btn en position ouvert
    $arrowDownAppliances.style.display = 'none'; // on cacher la flèche qui pointe vers le bas
    $arrowUpAppliances.style.display = 'block'; // & on affiche la flèche qui pointe vers le haut

    // affichage de l'input & icône "loupe" du filtre des appareil
    $filterInputAppliances.classList.toggle('toggle-display-appliances');
    $inputAppliancesIcon.classList.toggle('toggle-flex-appliances');
    /* $filterInputAppliances.style.display = 'block';
    $inputAppliancesIcon.style.display = 'flex'; */
  });

  // au click sur la liste du dropdown des appareils(comportement à vérifier)
  $filterAppliancesList.addEventListener('click', () => {

    // on affiche le tag
    //$buttonTagAppliances.style.display = 'block';

    // on cache la liste
    // $filterAppliancesList.style.display = 'none';

    // on passe le btn en position fermée
    $arrowUpAppliances.style.display = 'none'; // on cache la flèche qui pointe vers le haut
    $arrowDownAppliances.style.display = 'block'; // on affiche la flèche qui pointe vers le bas

    // désaffichage de l'input du filtre des appareil
    // $filterInputAppliances.style.display = 'none'; // on cache l'input
    // $inputAppliancesIcon.style.display = 'none'; // on cache la loupe
  })

  // event listener on tag's arrow (to close tag & re-push element into filter list)
  /* $closeTagAppliances.addEventListener('click', () => {
    $tagIngredientButton.style.display = 'none';
  }) */
}

/**
 * display ustensils list
 * @param {string[]} appliances 
 */
export function displayUstensils(ustensils) {
  const $div = document.querySelector('#ustensils');
  //$div.innerHTML = '';
  let $ul = '<ul>';
  for (let i = 0; i < ustensils.length; i++) {
    $ul += `<li>${ustensils[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);


  // au click sur le boutton du dropdown des ustensils
  $dropdownUstensilsBtn.addEventListener('click', () => {
    // bascule (toggle) entre afficher et cacher la liste des ustensils
    $filterUstensilsList.classList.toggle('toggle-display-ustensils');
    // MAJ de l'affichage des flèches avec le dropdown en position "ouvert"
    $arrowDownUstensils.style.display = 'none';
    $arrowUpUstensils.style.display = 'block';
    // affichage input & icône "loupe"
    $filterInputUstensils.classList.toggle('toggle-display-ustensils');
    $inputUstensilsIcon.classList.toggle('toggle-flex-ustensils');
    /* $filterInputUstensils.style.display = 'block';
    $inputUstensilsIcon.style.display = 'flex'; */
  });

  // au click sur la liste des ustensils (comportement à vérifier)
  $filterUstensilsList.addEventListener('click', () => {
    /* $buttonTagUstensils.style.display = 'block';
    $filterUstensilsList.style.display = 'none'; */
    $arrowUpUstensils.style.display = 'none';
    $arrowDownUstensils.style.display = 'block';
    /* $filterInputUstensils.style.display = 'none';
    $inputUstensilsIcon.style.display = 'none'; */
  })
  /* $closeTagUstensils.addEventListener('click', () => {
    $buttonTagUstensils.style.display = 'none';
  }) */
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
 * @param {*} recipes 
 */
async function displayRecipeData(recipes) {
  recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    $recipeSection.appendChild(Template.createRecipeCard());
  })
}

/**
 * fn de nettoyage pour préparer un nouvel affichage, 
 * soit chargée de vider les recettes affichées du DOM
 */
function deleteDisplayData() {
  $recipeSection.textContent = '';
}

document.addEventListener("DOMContentLoaded", function () {

  displayRecipeData(recipes); // affichage initial du total des recettes (avant recherche)
  totalRecipedDisplayed(recipes); // affichage nbre de recettes affichées

  /* affichage de la liste des menus déroulants */
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

  $formSubmit.addEventListener('change', (e) => {
    e.preventDefault();
    let target = e.target.value.toLowerCase();
    query.term = target;
    const result = searchRecipes(query);
    if (target.length >= 3) {
      deleteDisplayData();
      displayRecipeData(result);
      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result, target);
    }
    console.log('ok, recherche...', target, result, query);
    // enfin, on réinitialise le champs de la recherche principale au click sur le btn
    resetForm($formSubmit);
  })

  $primarySearch.addEventListener('input', (e) => {
    let target = e.target.value.toLowerCase();
    query.term = target;
    const result = searchRecipes(query);
    console.log('recherche principale:', result, 'nbr char.: ', target.length);

    // on lance la recherche à partir de 3 charactères
    if (target.length >= 3) {
      deleteDisplayData(); // suppression des recettes affichées
      displayRecipeData(result); // affichage des nouvelles recettes
      deleteRecipesNumberTitle(); // supprime précédent titre de total du nbre de recettes
      totalRecipedDisplayed(result, target); // affiche nbre total de recettes
      // + MAJ des filtres
      // displayIngredients(updateIngredientsList('', result));
    }
  });

  // on écoute au click: MAJ des recettes + MAJ des 3 listes en fonction du tag sélectionné
  function onClickToIngredient() {
    const $ingredientsList = Array.from(document.querySelectorAll('#ingredients ul li'));
    console.table('$ingredientsList: ', $ingredientsList);
    $ingredientsList.forEach((ingredient, i) => {
      ingredient.addEventListener("click", (e) => {
        console.log('forEach ingredient + index, au click => ', ingredient, i);

        // génération des élements HTML constituant un tag
        const $tagsIngredientsWrapper = document.querySelector('.ingredients-tags-wrapper');
        const $tagIngredientButton = document.createElement('button');
        const $spanIngredientParentText = document.createElement('span');
        const $spanIngredientChildText = document.createElement('span');
        const $closingTagIngredient = document.createElement('button');
        // ajout de classes & attributs sur le tag
        $spanIngredientParentText.classList.add('d-flex');
        $spanIngredientParentText.classList.add('justify-content-around');
        $spanIngredientChildText.setAttribute('id', 'content-tag-ingredients')
        $tagIngredientButton.classList.add('button-tag');
        $tagIngredientButton.classList.add('show-tag');
        $closingTagIngredient.classList.add('close-tag-ingredients');
        // injection du text dans le tag
        $closingTagIngredient.textContent = 'X'; // à remplacer par 1 croix (icône "close")
        $spanIngredientChildText.textContent = e.target.textContent; // injection du nom de l'ingrédient ds le tag
        const target = e.target.textContent.toLowerCase();
        // ajout dans le DOM des élements constituant un tag
        $tagsIngredientsWrapper.appendChild($tagIngredientButton);
        $tagIngredientButton.appendChild($spanIngredientParentText);
        $spanIngredientParentText.appendChild($spanIngredientChildText);
        $spanIngredientParentText.appendChild($closingTagIngredient);

        // pr l'instant le tab."query.ingredients" est vide (ainsi que tt l'objet query)
        console.log(query, query.ingredients);

        // on stock le (ou les) éléments ds le tableau des ingrédients
        query.ingredients.push(target); // on a maintenant l'element ds notre tableau
        console.log(query.ingredients);
        const result = searchRecipes(query);
        // suppression des recettes affichées (nettoyage avant d'afficher une nouvelle liste de recettes)
        deleteDisplayData();
        // fn d'affichage des recettes
        displayRecipeData(result);
        deleteRecipesNumberTitle();
        totalRecipedDisplayed(result, target);
        console.log('filtre par ingredients : ', result);

        // supprimer l'ingredient au click
        e.target.remove();

        // affichage de l'item sélectionné en haut de la liste dans un <p> HTML avec 1 <span> pr texte & 1 <i> pr icône
        const $itemOnTheTop = document.createElement('p');
        const $itemText = document.createElement('span');
        const $itemArrow = document.createElement('i');
        $itemArrow.classList.add('fa-solid');
        $itemArrow.classList.add('fa-circle-xmark');
        $itemArrow.classList.add('close-item-on-the-top');
        $itemText.textContent = e.target.textContent;
        const $list = document.querySelector('#ingredients ul');
        $itemOnTheTop.appendChild($itemText);
        $itemOnTheTop.appendChild($itemArrow);
        $list.appendChild($itemOnTheTop);
        $list.classList.add('item-on-the-top');

        // MAJ les élements des listes en fonction de l'ingredient sélectionné 
        // & selon les ingredients, appliances & ustensils contenus ds les recettes affichées

        // utiliser la fn updateIngredientsList() ms avec un 2eme paramètre
        // clear HTML elements list

        /**
         * ajouter fn de MAJ de l affichage, qd on supprime le tag
         */
        $closingTagIngredient.addEventListener('click', () => {

          // cache le tag & cache l'item sélectionné (voir si l'item doit encore etre a cette position?)
          $tagIngredientButton.style.display = 'none';
          $itemOnTheTop.style.display = 'none';

          // il faut re-afficher l'ingredient en tant que <li> ds la liste
          const $addListItem = document.createElement('li');
          $addListItem.textContent = e.target.textContent;
          console.log($addListItem);
          $list.appendChild($addListItem);  // ajout de l element ds le DOM

          // on supprime l'element du tableau "ingredients" ds l objet "query"
          query.ingredients.pop($addListItem); // on a maintenant l'element ds notre tableau
          console.log(query.ingredients);

          // MAJ recettes
          const updatedResult = searchRecipes(query);
          deleteDisplayData();
          displayRecipeData(updatedResult);
          deleteRecipesNumberTitle();
          totalRecipedDisplayed(updatedResult, target);
        })

        $itemArrow.addEventListener('click', () => {
          $itemOnTheTop.style.display = 'none';
        })
      })
    })
  }
  onClickToIngredient();

  function onClickToAppliance() {
    const $appliancesList = Array.from(document.querySelectorAll('#appliances ul li'));
    $appliancesList.forEach((appliance) => {
      appliance.addEventListener("click", (e) => {
        // on crée le tag HTML (création dynamique qui permet de générer 1 nouveau tag à chaque clic sur 1 ingrédient)
        const $tagsAppliancesWrapper = document.querySelector('.appliances-tags-wrapper');
        const $tagApplianceButton = document.createElement('button');
        const $spanApplianceParentText = document.createElement('span');
        const $spanApplianceChildText = document.createElement('span');
        const $closingTagAppliance = document.createElement('button');
        $spanApplianceParentText.classList.add('d-flex');
        $spanApplianceParentText.classList.add('justify-content-around');
        $spanApplianceChildText.setAttribute('id', 'content-tag-appliances')
        $tagApplianceButton.classList.add('button-tag');
        $tagApplianceButton.classList.add('show-tag');
        $closingTagAppliance.classList.add('close-tag-appliances');
        $closingTagAppliance.textContent = 'X'; // à remplacer par 1 croix (icône "close")
        $spanApplianceChildText.textContent = e.target.textContent; // injection du nom de l'ingrédient ds le tag
        const target = e.target.textContent.toLowerCase();
        $tagsAppliancesWrapper.appendChild($tagApplianceButton);
        $tagApplianceButton.appendChild($spanApplianceParentText);
        $spanApplianceParentText.appendChild($spanApplianceChildText);
        $spanApplianceParentText.appendChild($closingTagAppliance);

        // ajout "target" ds le tableau des appareils
        query.appliances.push(target);
        const result = searchRecipes(query); /* fn combineles résultats des recherches (relance recherche principale & autres recherches) */

        // MAJ affichage recettes
        deleteDisplayData();
        displayRecipeData(result);

        // MAJ affichage du nombre total de recettes affichées
        deleteRecipesNumberTitle();
        totalRecipedDisplayed(result, target);
        console.log('filtre par appareils : ', result);

        // il faut également 1 fn de MAJ des listes selon le resultat des recettes
        // utiliser la fn updateIngredientsList() ms avec un 2eme paramètre

        /* const $updated = document.querySelectorAll('#appliances ul li');
        $updated.forEach((item) => {
          console.log(item);
          return item.textContent = '';
        })
        let updated = updateAppliancesList(target, result);
        console.log(updateAppliancesList(target, result));
        displayAppliances(updated); */

        // affichage de l'item sélectionné en haut de la liste dans un <p> HTML avec 1 <span> pr texte & 1 <i> pr icône
        const $itemOnTheTop = document.createElement('p');
        const $itemText = document.createElement('span');
        const $itemArrow = document.createElement('i');
        $itemArrow.classList.add('fa-solid');
        $itemArrow.classList.add('fa-circle-xmark');
        $itemArrow.classList.add('close-item-on-the-top');
        $itemText.textContent = e.target.textContent;
        const $list = document.querySelector('#appliances ul');
        $itemOnTheTop.appendChild($itemText);
        $itemOnTheTop.appendChild($itemArrow);
        $list.appendChild($itemOnTheTop);
        $list.classList.add('item-on-the-top');

        $closingTagAppliance.addEventListener('click', () => {
          $tagApplianceButton.style.display = 'none';
          $itemOnTheTop.style.display = 'none'; // cache l'item sélectionné
          const $addListItem = document.createElement('li');
          $addListItem.textContent = e.target.textContent;
          $list.appendChild($addListItem);
        })
        $itemArrow.addEventListener('click', () => {
          $itemOnTheTop.style.display = 'none';
        })
      })
    })
  }
  onClickToAppliance();

  // utiliser methode filter() pr supprimer & ajouter à la liste l'element clické 
  function onClickToUstensil() {
    const $ustensilsList = Array.from(document.querySelectorAll('#ustensils ul li'));
    $ustensilsList.forEach((ustensil) => {
      ustensil.addEventListener("click", (e) => {

        // on crée le tag HTML (création dynamique qui permet de générer 1 nouveau tag à chaque clic sur 1 ingrédient)
        const $tagsUstensilsWrapper = document.querySelector('.ustensils-tags-wrapper');
        const $tagUstensilButton = document.createElement('button');
        const $spanUstensilParentText = document.createElement('span');
        const $spanUstensilChildText = document.createElement('span');
        const $closingTagUstensil = document.createElement('button');
        $spanUstensilParentText.classList.add('d-flex');
        $spanUstensilParentText.classList.add('justify-content-around');
        $spanUstensilChildText.setAttribute('id', 'content-tag-ustensils')
        $tagUstensilButton.classList.add('button-tag');
        $tagUstensilButton.classList.add('show-tag');
        $closingTagUstensil.classList.add('close-tag-ustensils');
        $closingTagUstensil.textContent = 'X'; // à remplacer par 1 croix (icône "close")
        $spanUstensilChildText.textContent = e.target.textContent; // injection du nom de l'ingrédient ds le tag
        const target = e.target.textContent.toLowerCase();
        $tagsUstensilsWrapper.appendChild($tagUstensilButton);
        $tagUstensilButton.appendChild($spanUstensilParentText);
        $spanUstensilParentText.appendChild($spanUstensilChildText);
        $spanUstensilParentText.appendChild($closingTagUstensil);

        query.ustensils.push(target);

        const result = searchRecipes(query);
        deleteDisplayData();
        displayRecipeData(result);
        deleteRecipesNumberTitle();
        totalRecipedDisplayed(result, target);
        console.log('filtre par ustensils: ', result);

        // affichage de l'item sélectionné en haut de la liste dans un <p> HTML avec 1 <span> pr texte & 1 <i> pr icône
        const $itemOnTheTop = document.createElement('p');
        const $itemText = document.createElement('span');
        const $itemArrow = document.createElement('i');
        $itemArrow.classList.add('fa-solid');
        $itemArrow.classList.add('fa-circle-xmark');
        $itemArrow.classList.add('close-item-on-the-top');
        $itemText.textContent = e.target.textContent;
        const $list = document.querySelector('#ustensils ul');
        $itemOnTheTop.appendChild($itemText);
        $itemOnTheTop.appendChild($itemArrow);
        $list.appendChild($itemOnTheTop);
        $list.classList.add('item-on-the-top');

        // écoute au click fermeture tag (MAJ affichage)
        $closingTagUstensil.addEventListener('click', () => {
          $tagUstensilButton.style.display = 'none';
          $itemOnTheTop.style.display = 'none'; // cache l'item sélectionné
          const $addListItem = document.createElement('li');
          $addListItem.textContent = e.target.textContent;
          $list.appendChild($addListItem);
        })
        $itemArrow.addEventListener('click', () => {
          $itemOnTheTop.style.display = 'none';

          // & on recréé un <li> contenant l'ingrédient à replacer ds la liste
          /* const $addListItem = document.createElement('li');
          $addListItem.textContent = e.target.textContent;
          $list.appendChild($addListItem); */
        })
      })
    })
  }
  onClickToUstensil();

  /**
   * input - filter by ingredient 
   */
  $filterInput.addEventListener('input', (e) => {

    // clear HTML elements list
    const $list = document.querySelectorAll('#ingredients ul li');
    $list.forEach((item) => {
      console.log(item);
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