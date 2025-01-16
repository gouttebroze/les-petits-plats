/** 
 * @param {string{}} query - object contains all search queries
 * with "ingredients", "appliances" & "ustensils" filter lists as arrays
 */
function onClickToIngredient(query) {

  // convert <ul> with <li>, an HTML node to an array
  const $ingredientsList = Array.from(document.querySelectorAll('#ingredients ul li'));

  // on each ingredient into ingredients liste
  $ingredientsList.forEach((ingredient, i) => {

    // listen click event
    ingredient.addEventListener("click", (e) => {

      // Tags components generation
      const $tagsIngredientsWrapper = document.querySelector('.ingredients-tags-wrapper');
      const $tagIngredientButton = document.createElement('button');
      const $spanIngredientParentText = document.createElement('span');
      const $spanIngredientChildText = document.createElement('span');
      const $closingTagIngredient = document.createElement('button');
      // add CSS classes & attributes on tags components
      $spanIngredientParentText.classList.add('d-flex');
      $spanIngredientParentText.classList.add('justify-content-around');
      $spanIngredientChildText.setAttribute('id', 'content-tag-ingredients')
      $tagIngredientButton.classList.add('button-tag');
      $tagIngredientButton.classList.add('show-tag');
      $closingTagIngredient.classList.add('close-tag-ingredients');

      // TODO
      $closingTagIngredient.textContent = 'X'; // à remplacer par 1 croix (icône "close")
      $spanIngredientChildText.textContent = e.target.textContent; // injection du nom de l'ingrédient ds le tag

      // add HTML elements, represents Tags components, on DOM
      $tagsIngredientsWrapper.appendChild($tagIngredientButton);
      $tagIngredientButton.appendChild($spanIngredientParentText);
      $spanIngredientParentText.appendChild($spanIngredientChildText);
      $spanIngredientParentText.appendChild($closingTagIngredient);
      const target = e.target.textContent.toLowerCase();

      // add selected ingredient into ingredients array (into query object)
      query.ingredients.push(target);


      const result = searchRecipes(query);
      // deleteDisplayData(); // removed fn
      displayRecipeData(result);
      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result, target);

      e.target.remove(); // remove target element to DOM (target element as selected ingredient of ingredients)

      // displayed selected ingredient on the top (re-create an new HTML elements, a <p> HTML tag around a <span> & an <i> HTML tags)
      // HTML elements creation
      const $itemOnTheTop = document.createElement('p');
      const $itemText = document.createElement('span');
      const $itemArrow = document.createElement('i');

      // add CSS classes to elements
      $itemArrow.classList.add('fa-solid');
      $itemArrow.classList.add('fa-circle-xmark');
      $itemArrow.classList.add('close-item-on-the-top');

      // add ingredient name
      $itemText.textContent = e.target.textContent;

      // add elements on DOM
      const $list = document.querySelector('#ingredients ul');
      $itemOnTheTop.appendChild($itemText);
      $itemOnTheTop.appendChild($itemArrow);
      $list.appendChild($itemOnTheTop);
      $list.classList.add('item-on-the-top');

      // listen on click on arrow to closing tag
      $closingTagIngredient.addEventListener('click', () => {

        // to hide the tag & the new item on the top
        $tagIngredientButton.style.display = 'none';
        $itemOnTheTop.style.display = 'none';

        // toggle the hidden ingredient to a visible displayed
        // create a new HTML element with the ingredient name
        const $addListItem = document.createElement('li');
        $addListItem.textContent = e.target.textContent;

        // add element to DOM
        $list.appendChild($addListItem);

        // to remove selected ingredient of ingredients array       
        query.ingredients.pop($addListItem);

        // to update global recipes displayed
        const updatedResult = searchRecipes(query);
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

function onClickToAppliance(query) {
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

function onClickToUstensil(query) {
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
}

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
  $div.innerHTML = '';
  let $ul = '<ul>';
  for (let i = 0; i < ustensils.length; i++) {
    $ul += `<li>${ustensils[i]}</li>`;
  }
  $ul += '</ul>';
  $div.insertAdjacentHTML('beforeend', $ul);

  onClickToUstensil(query);

  /* $closeTagUstensils.addEventListener('click', () => {
    $buttonTagUstensils.style.display = 'none';
  }) */
}