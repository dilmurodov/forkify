
import icons from "url:../../img/icons.svg";

class ResultsView {
    #parentElement = document.querySelector(".results");
    #data;

  
    loadingSpinner() {
      this.#clearHTML();
      let html = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
      this.#parentElement.insertAdjacentHTML('afterbegin', html);
    }

    render(data){
        this.#data = data;
        this.#clearHTML();
        this.#data.map(item => {
            this.#generateHTML(item)
        })
    }
    #clearHTML(){
        this.#parentElement.innerHTML = '';
    }
    #generateHTML(obj){
        let html = `<li class="preview">
        <a class="preview__link " href="#${obj.id}">
          <figure class="preview__fig">
            <img src="${obj.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${obj.title}</h4>
            <p class="preview__publisher">${obj.publisher}</p>
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

export default new ResultsView();