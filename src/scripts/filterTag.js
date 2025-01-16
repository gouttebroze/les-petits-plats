class IngredientTag {
  constructor(ingredient) {
    this._ingredient = ingredient;
  }

  createDOMIngredientTag() {
    const $tagsWrapper = document.querySelector('.ingredients-tags-wrapper');
    /* const $tagButton = document.createElement('button');
    const $spanParent = document.createElement('span');
    const $spanChild = document.createElement('span');
    const $closingTagIngredient = document.createElement('button'); */
    const $btnTagIng = `
      <button class="button-tag show-tag">
        <span class="d-flex justify-content-around">
          <span id="content-tag-ingredients">${this._ingredient}</span>
        </span>
        <button class="close-tag-ingredients">|+|</button
      </button>
    `;
    $tagsWrapper.appendChild($btnTagIng);
    // ingredient > e.target
    return $tagsWrapper;
  }

  deleteDOMTagByFilter() {

  }
}