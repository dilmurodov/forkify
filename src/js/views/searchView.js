class SearchView {
    #data;
    #parentElement = document.querySelector('.search');

    searchInput(handled){
        return this.#parentElement.addEventListener('submit', e => {
            e.preventDefault();
            const inputValue = this.#parentElement.querySelector('.search__field').value;
            // console.log(inputValue);
            handled(inputValue);
        })
    }
}

export default new SearchView();