export default class RecipeCard {
  constructor(recipe) {
    this._recipe = recipe;
    this._image = `./JSON+recipes/recipes/${this._recipe.image}`;
  }

  createRecipeCard() {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('card');

    const recipeCard = `

      <div class='card'>

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
        
      </div>
    `;

    $wrapper.innerHTML = recipeCard;

    return $wrapper;
  }

  createIngredientsList() {
    const $listWrapper = document.createElement('div');
    $listWrapper.classList.add('ingredients-list-wrapper');

    console.log(this._recipe.ingredients);

    const ingredientList = this._recipe.ingredients.map((ingredient) =>
      `<p>Ingrédients</p>
        <ul>
          <li>${ingredient.ingredient}</li>
          <li>${ingredient.quantity}</li>
          <li>${ingredient.unit || ''}</li>
        </ul>
      `)
    $listWrapper.innerHTML = ingredientList;

    return $listWrapper.outerHTML;

  }
}