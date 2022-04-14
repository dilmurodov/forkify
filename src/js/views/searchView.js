class SearchView {
    #data;
    #parentElement = document.querySelector('.search');

    getSearch(hand){
        this.#parentElement.addEventListener('submit', e => {
            e.preventDefault();
            const inputValue = this.#parentElement.querySelector('.search__field').value;
            console.log(inputValue);
            // hand();
        })
    }

}

export default new SearchView();