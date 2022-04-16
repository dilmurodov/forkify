import icons from '../../img/icons.svg';

class resultsView {
  #data;
  #parentElement = document.querySelector('.results');

  render(data) {
    this.#data = data;
    this.#clearHTML();
    this.#renderResults();
  }

  #clearHTML() {
    this.#parentElement.innerHTML = '';
  }

  #renderResults() {
    const recipe = this.#data;
    console.log(recipe);
    recipe.results.forEach(item => {
      const html = `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${item.id}">
              <figure class="preview__fig">
                <img src="${item.img}" alt="Test"/>
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${item.title}</h4>
                <p class="preview__publisher">${item.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
      this.#parentElement.insertAdjacentHTML('afterbegin', html);
    });
  }
}

export default new resultsView();
