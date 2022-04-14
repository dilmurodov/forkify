import icons from "../../img/icons.svg"

class resultsView{
    #data;
    #parentElement = document.querySelector(".results");

    render(){
        this.#clearHTML();
        this.#renderResults();
    }
    
    #clearHTML(){
        this.#parentElement.innerHTML = ""
    }
    
    #renderResults(){
        const recipe = this.#data;
        const html = `
        <li class="preview">
            <a class="preview__link preview__link--active" href="${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.img}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`
          this.#parentElement.insertAdjacentHTML('afterbegin', html);
    }
}

export default new resultsView();