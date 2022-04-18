class bookmarksView {

  #parentElement = document.querySelector('.bookmarks__list');
  #data;

  addHandleLoad(handle){
    handle()
  }

  render(data) {
    this.#data = data;
    this.#clearHTML();
    this.#renderHTML();
  }

  #renderHTML() {
    
    this.#data.forEach(recipe => {
        let html = `<li class="preview">
                    <a class="preview__link" href="#${recipe.id}">
                      <figure class="preview__fig">
                        <img src="${recipe.image}" alt="${recipe.title}" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__title">
                          ${recipe.title} ...
                        </h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                      </div>
                    </a>
                  </li>`;

        this.#parentElement.insertAdjacentHTML('afterbegin', html);
    });
    
  }

  #clearHTML() {
    this.#parentElement.innerHTML = '';
  }

}

export default new bookmarksView();