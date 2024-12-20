class RecipeCard {
  constructor(recipe) {
    this._recipe = recipe;
    // chemin vers dossier contenant les images diffère:
    // live server
    this._image = `./public/JSON+recipes/recipes/${this._recipe.image}`;
    // "vite.js"
    // this._image = `./JSON+recipes/recipes/${this._recipe.image}`;
  }

  createRecipeCard() {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('grid');
    $wrapper.classList.add('rounded-top-4');

    const recipeCard = `
    <div class="card manrope card-wrapper rounded-top-4">
      <img src=${this._image} alt=${this._recipe.name} class="rounded-top-4 card-image z-10">
      <button class="card-btn button-sm">
        ${this._recipe.time}min
      </button>
      <div class="card-body text-start">
        <h5 class="card-body-name anton">${this._recipe.name}</h5>
        <section class="card-body-recipes">
          <p class="recipes-title uppercase">Recette</p>
          <p class="card-text">${this._recipe.description}</p>        
        </section>
        <section class="card-body-ingredients">
          <p class='ingredient-title uppercase'>Ingrédients</p>
          <div class="card-text container">
            ${this.createIngredientsList()}
          </div>       
        </section>
      </div>
    </div>
    `;
    $wrapper.innerHTML = recipeCard;

    return $wrapper;
  }

  createIngredientsList() {
    const $listWrapper = document.createElement('ul');
    $listWrapper.classList.add('row');
    $listWrapper.classList.add('list-grid');
    const ingredientList = this._recipe.ingredients.map((ingredient) =>
      `<li class='ingredient-item col text-left'>
        <span class='ingredient-name'>
          ${ingredient.ingredient}
        </span>
        <br />
        <span class='ingredient-type'>
          ${ingredient.quantity || ''} ${ingredient.unit || ''}
        </span>
       </li>`).join('');
    $listWrapper.innerHTML = ingredientList;

    return $listWrapper.outerHTML;

  }
}