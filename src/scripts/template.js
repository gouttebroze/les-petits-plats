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
} */

/* function onClickToAppliance() {
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

      // MAJ affichage du nombre total de recettes affichées
      deleteRecipesNumberTitle();
      totalRecipedDisplayed(result, target);
      console.log('filtre par appareils : ', result);

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
} */

/* function onClickToUstensil() {
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