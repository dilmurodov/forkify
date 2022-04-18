const { async } = require('regenerator-runtime');

import * as model from './model.js';

import recipeview from './views/recipeView.js';

import searchview from './views/searchView.js';

import resultsView from './views/resultsView.js';

import paginationView from './views/paginationView.js';

import bookmarksView from './views/bookmarksView.js';

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    
    // console.log(id);
    
    if (!id) return;

    recipeview.loadingSpinner();

    await model.loadRecipe(id);

    servingsController();

  } catch (err) {
    recipeview.renderError();
  }
};


const searchController = async function () {
  try {
    const inputValue = searchview.getQuery();

    // console.log(inputValue);
    resultsView.loadingSpinner();

    await model.searchResults(inputValue);

    const data = model.paginationLogic();

    paginationView.render(model.state.search);

    resultsView.render(data);
  } catch (err) {
    alert(err);
  }
};

const paginationController = async function (page) {
  try {
    const data = model.paginationLogic(page);
    paginationView.render(model.state.search);
    resultsView.render(data);
  } catch (err) {
    alert(err);
  }
};

const servingsController = function(servings) {
  
  model.udateServings(servings);
  const data = model.state.recipe;
  recipeview.render(data);
}

const bookmarkController = function (bookmark) {
  if(!model.state.recipe.bookmarked){
    model.saveBookmarks(bookmark);
  } else {
    model.removeBookmarks(bookmark.id);
  }
  Bookmarks.render(model.state.bookmarks);
  recipeview.render(bookmark);
  console.log(model.state.bookmarks);
}

const loadBookMarkController = function() {
  const data = model.getLocaleStorage();
  model.state.bookmarks = data;
  bookmarksView.render(data);
}

const init = function(){
  bookmarksView.addHandleLoad(loadBookMarkController)
  searchview.addHandlerEvent(searchController);
  recipeview.addHandler(showRecipe);
  paginationView.addHandlerEvent(paginationController)
  recipeview.addHandlerServings(servingsController);
  recipeview.addHandleBookmark(bookmarkController);
}
init();