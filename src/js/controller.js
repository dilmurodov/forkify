const { async } = require('regenerator-runtime');

import { loadRecipe, state, searchResults } from './model.js';

import recipeview from './views/recipeView.js';

import searchview from './views/searchView.js';

import resultsView from './views/resultsView.js';

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeview.loadingSpinner();
    
    await loadRecipe(id);
    const data = state.recipe;
    
    recipeview.render(data);
  } catch (err) {
    recipeview.renderError();
  }
};

const searchController = async function(){
  const inputValue = searchview.getQuery();
  console.log(inputValue);
  await searchResults(inputValue);
  const data = state.search.results;
  resultsView.render(data);
}
searchview.addHandlerEvent(searchController);
showRecipe();
recipeview.addHandler(showRecipe);
// initial