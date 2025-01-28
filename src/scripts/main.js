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

/* function updateDisplayIngredientsList() {
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
 }*/

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

// a debug: creation d une liste de <ul> au lieu de <li> qd on cree ou manip tag 
/* function onClickToIngredient() {
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

      // ajout dans le DOM des élements constituant un tag
      $tagsIngredientsWrapper.appendChild($tagIngredientButton);
      $tagIngredientButton.appendChild($spanIngredientParentText);
      $spanIngredientParentText.appendChild($spanIngredientChildText);
      $spanIngredientParentText.appendChild($closingTagIngredient);
      const target = e.target.textContent.toLowerCase();
      // pr l'instant le tab."query.ingredients" est vide (ainsi que tt l'objet query)
      console.log(query, query.ingredients);

      // const tagIngredientTemplate = new IngredientTag(ingredient);

      // on stock le (ou les) éléments ds le tableau des ingrédients
      query.ingredients.push(target); // on a maintenant l'element ds notre tableau
      console.log(query.ingredients);
      const result = searchRecipes(query);
      deleteDisplayData();
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

      $closingTagIngredient.addEventListener('click', () => {

        // cache le tag & cache l'item sélectionné (voir si l'item doit encore etre a cette position?)
        $tagIngredientButton.style.display = 'none';
        $itemOnTheTop.style.display = 'none';

        // il faut re-afficher l'ingredient en tant que <li> ds la liste
        const $addListItem = document.createElement('li');
        $addListItem.textContent = e.target.textContent;
        console.log($addListItem);
        $list.appendChild($addListItem);  // ajout de l element ds le DOM

        // copie du tab avec element a supprimer ms a ajouter ds liste du filtre
        //let ingredientsArrayCopie = [...query.ingredients]
        query.ingredients.pop($addListItem); // on supprime l'element ds notre tableau
        //console.log(ingredientsArrayCopie, query.ingredients);
        // ingredientsArrayCopie.concat($ingredientsList)

        //let target = e.target.value.toLowerCase();
        //let newList = updateIngredientsList($addListItem);
        //displayIngredients(newList);
        //console.log(updateIngredientsList(target));

        // MAJ recettes
        // const updatedResult = searchRecipes(query.ingredients);
        const updatedResult = searchRecipes(query);
        //deleteDisplayData();
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
      const result = searchRecipes(query);
      // MAJ affichage recettes
      deleteDisplayData();
      displayRecipeData(result);
      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result, target);
      console.log('filtre par appareils : ', result);
      e.target.remove();// supprimer l'appareil au click

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

        // on supprime l'element du tableau "appliances" ds l objet "query"
        query.appliances.pop($addListItem); // on a maintenant l'element ds notre tableau
        console.log(query.appliances);

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

      e.target.remove();// suppression de l'ustensil au click

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

        query.ustensils.pop($addListItem);
        console.log(query.ustensils);

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
} */

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

  displayRecipeData(recipes); // affichage initial du total des recettes (avant recherche)
  totalRecipedDisplayed(recipes); // affichage nbre de recettes affichées

  /* affichage de la liste des menus déroulants */
  const ingredients = updateIngredientsList(''); // récupération & MAJ liste ingrédients
  const appliances = updateAppliancesList(''); // récupération & MAJ liste appareils
  const ustensils = updateUstensilsList(''); // récupération & MAJ liste ustensils

  displayIngredients(ingredients); // affichage de la liste des ingrédients
  displayAppliances(appliances); // affichage de la liste des appareils
  displayUstensils(ustensils); // affichage de la liste des ustensils

  /**
   * recherche principale
   * TODO: relancer affichage avec reset sur input
   */
  /*  function handleInputSearch(e, query) {
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
   } */
  // on "input" event (reload search results on every input field new character)
  $primarySearch.addEventListener('input', (e) => {
    e.preventDefault();
    let target = e.target.value.toLowerCase();
    query.term = target;
    const result = searchRecipes(query);
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
      const result = searchRecipes(query);
      // const result = searchByArrayObjects(query);
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