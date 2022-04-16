
import icons from "../../img/icons.svg"

class PaginationView {
  #parentElement = document.querySelector('.pagination');
  #data;
  
  addHandlerEvent(handle){
    this.#parentElement.addEventListener('click', e => {
      
      if(!e.target.closest(".btn--inline")) return;
      handle(+e.target.closest(".btn--inline").getAttribute("data-id"));
    })
  }

  render(data) {
    this.#data = data; // state.search
    console.log(this.#data);
    this.#clearBnts();
    this.#renderBtns();
  }

  #clearBnts() {
    this.#parentElement.innerHTML = '';
  }

  #renderBtns() {

    const currentPage = this.#data.page;
    const lastPage = Math.ceil(this.#data.results.length/this.#data.perPage);
    console.log(currentPage, lastPage);

    const btnPrev = 
    `<button class="btn--inline pagination__btn--prev" data-id=${currentPage-1}>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage-1}</span>
    </button>`;

    const btnNext = 
    `<button class="btn--inline pagination__btn--next" data-id=${currentPage+1}>
      <span>Page ${currentPage+1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;

    if (currentPage > 1) {
      this.#parentElement.insertAdjacentHTML('afterbegin', btnPrev);
    }
    if (currentPage < lastPage) {
      this.#parentElement.insertAdjacentHTML('afterbegin', btnNext);
    }
  }
}

export default new PaginationView();
