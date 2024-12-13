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

/** 
 * recupère & MAJ la liste des ingrédients, sans doublons.
 * pr la MAJ: doit filtrer les ingredients correspondant à l'input 
 * MAJ doit aussi se faire suivant: 
 *   - recherche principale, 
 *   - tag sélectionné ds les autres listes
 *  Les résultats de recherche sont actualisés 
 *  les éléments disponibles sont actualisés dans les champs de recherche avancée
 *  faire 1 MAJ sur la liste des appareils & celle des ustensils par rapport à "term"
 * @property {string} term
 * @property {string[]} toUpdate - listes à MAJ (celle des appareils & des 
 * ustensils en fonction des recettes générées par le term)
 * @returns {void}
 */
function updateIngredientsList(term, list) {
  // updatedList = ingredient I === liste des ustensils && liste des appareils, inclus ds les recettes générées par l'ingrédient I
  let updatedIngredients = [];
  let updatedAppliancesByIngredients = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(term.toLowerCase())) {
        updatedIngredients.push(recipes[i].ingredients[j].ingredient.toLowerCase());
      }
    }
  }
  /**
   * trouver: liste de tous les appareils + liste de tous les ustensils: 
   *      - dont la recette contient l'ingrédient I
   * appareil inclus dans recette de I, recette de I contient apparei
   
  let updatedFilterList = [];
  updatedIngredients.filter((recipe) => recipe.ingredients.ingredient === recipes.appliance);
*/

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
function displayUstensils(ustensils) {
  const $div = document.querySelector('#ustensils');
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

  /** 
   * écoute de l'Event "input" sur la recherche principale 
   * L'évènement DOM input est déclenché quand la valeur de l'élément <input> est modifiée
   */
  // voir pr ajouter une MAJ des élements des listes des 3 filtres selon le terme de recherche
  $primarySearch.addEventListener('input', (e) => {
    let target = e.target.value.toLowerCase();
    query.term = target;
    const result = searchRecipes(query);
    console.log('recherche principale:', result, 'nbr char.: ', target.length);
    deleteDisplayData(); // suppression des recettes affichées
    displayRecipeData(result); // affichage des nouvelles recettes
    deleteRecipesNumberTitle(); // supprime précédent titre de total du nbre de recettes
    totalRecipedDisplayed(result); // affiche nbre total de recettes

    // MAJ des filtres
    const ingredients = updateIngredientsList(query.ingredients); // récupération & MAJ liste ingrédients
    const appliances = updateAppliancesList(''); // récupération & MAJ liste appareils
    const ustensils = updateUstensilsList(''); // récupération & MAJ liste ustensils

    console.table(ingredients);
    console.table(appliances);
    console.table(ustensils);

    displayIngredients(ingredients); // affichage de la liste des ingrédients
    displayAppliances(appliances); // affichage de la liste des appareils
    displayUstensils(ustensils); // affichage de la liste des ustensils
  });

  // on écoute au click: MAJ des recettes + MAJ des 3 listes en fonction du tag sélectionné
  function onClickToIngredient() {
    const $ingredientsList = Array.from(document.querySelectorAll('#ingredients ul li'));
    $ingredientsList.forEach((ingredient) => {
      ingredient.addEventListener("click", (e) => {
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

        // MAJ les élements des 2 autres listes en fonction de l'ingredient sélectionné
        // utiliser la fn updateIngredientsList() ms avec un 2eme paramètre
        updateIngredientsList(target, appliances);
        console.log(updateIngredientsList(target, appliances));

        $closingTagIngredient.addEventListener('click', () => {
          $tagIngredientButton.style.display = 'none'; // cache le tag
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
        totalRecipedDisplayed(result);
        console.log('filtre par appareils : ', result);

        // il faut également 1 fn de MAJ des listes selon le resultat des recettes

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

          // & on recréé un <li> contenant l'ingrédient à replacer ds la liste
          /* const $addListItem = document.createElement('li');
          $addListItem.textContent = e.target.textContent;
          $list.appendChild($addListItem); */
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
        totalRecipedDisplayed(result);
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

  // input: MAJ du contenu de la liste du filtre
  /**
   * input - filter by ingredient 
   * Au fur et à mesure du remplissage, les mots clés ne correspondant pas 
   * à la frappe dans le champ disparaissent
   * Ok - mais une fois la liste MAJ, les elements ne sont plus clickable....
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
    /**
     * pas de MAJ de l'affichage desrecettes mais 
     * une MAJ de l'affichage des élements de la liste 
     */
    //query.ingredients.push(target);
    //const result = searchRecipes(query);
    //deleteDisplayData();
    //displayRecipeData(result);
    //totalRecipedDisplayed(result);
  });

  /**
   * input - filter by appliance
   */
  $filterInputAppliances.addEventListener('input', (e) => {
    // clear HTML elements list
    const $list = document.querySelectorAll('#appliances ul li');
    $list.forEach((item) => {
      console.log(item);
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
      console.log(item);
      return item.textContent = '';
    })
    let target = e.target.value.toLowerCase();
    let newList = updateUstensilsList(target);

    // affichage de la nouvelle liste d'ustensils
    displayUstensils(newList);

    /* relance fn: 
    génere comportement de l'event "click" sur item d'1 liste, 
    génere tags, 
    MAJ affichage recettes et de leur nombre, 
    modifie position de l'item selectionné,
    génere comportement de réaction à la fermeture des tags ) des tags
    */
    onClickToUstensil();
  });
});