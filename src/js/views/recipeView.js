import icons from 'url:../../img/icons.svg';

import {Fraction}  from 'fractional'; // Export Library

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage = "Siz qidirayotgan ma'lumot topilmadi! Iltimos Qayta urunib kuring!"

  render(data) {
    this.#data = data;
    this.#clearHTML();
    this.#generateHTML();
  }

  loadingSpinner() {
    let html = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this.#clearHTML();
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }

  #clearHTML() {
    this.#parentElement.innerHTML = '';
  }
  #renderIng(ings) {
    return ings.map(item => {
      return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${item.quantity ? new Fraction(item.quantity) : ''}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${item.unit}</span>
              ${item.description}
            </div>
          </li>`;
    });
  }

  #generateHTML() {
    const html = `<figure class="recipe__fig">
  <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>
      
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this.#data.time
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this.#data.servings
          }</span>
          <span class="recipe__info-text">servings</span>
      
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
      
        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>
      
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this.#renderIng(this.#data.ingredients).join('')}
        </ul>
      </div>
      
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this.#data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.url}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }
  addHandler(data){
      ['hashchange', 'load'].forEach(item => {
          addEventListener(item, data);
      })
  }
  renderError(){
      let html = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${this.#errorMessage}</p>
    </div>`
    this.#clearHTML();
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export default new RecipeView();
