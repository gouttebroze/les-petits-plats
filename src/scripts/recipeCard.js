export default class RecipeCard {
  constructor(recipe) {
    this._recipe = recipe;
    this._image = `./JSON+recipes/recipes/${this._recipe.image}`;
  }

  createRecipeCard() {
    const $wrapper = document.createElement('div');
    //$wrapper.classList.add('card');
    $wrapper.classList.add('grid');
    $wrapper.classList.add('rounded-top-4');
    // $wrapper.classList.add('col-sm-10');

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
    /* <div class='card'>
    
            <section class='header-card relative'>
              <img class='header-card__image z-10' src=${this._image} alt=${this._recipe.name} />
              <button class="z-40 absolute top-[21px] right-[22px] h-50 px-6 text-xs font-normal rounded-lg bg-yellow-300 text-black">
                ${this._recipe.time}min
              </button>
              <h3 class='header-card__name'>${this._recipe.name}</h3>
            </section>
            
            <section class='main-card'>
              <p class='main-card__title uppercase'>Recette</p>
              <p class='main-card__description'>${this._recipe.description}</p>
            </section>
    
            ${this.createIngredientsList()}
            
          </div> */
    $wrapper.innerHTML = recipeCard;

    return $wrapper;
  }

  createIngredientsList() {
    const $listWrapper = document.createElement('ul');
    $listWrapper.classList.add('row');
    $listWrapper.classList.add('list-grid');
    // console.log(this._recipe.ingredients);
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