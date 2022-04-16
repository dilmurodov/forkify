class SearchView {
    #data;
    #parentElement = document.querySelector('.search');
    
    getQuery(){
        const inputValue = this.#parentElement.querySelector('.search__field').value;
        return inputValue;   
    }
    
    addHandlerEvent(handled){
        this.#parentElement.addEventListener('submit', e => {
            e.preventDefault();
            handled();
        })
    }
}

export default new SearchView();