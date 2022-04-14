import { async } from "regenerator-runtime"

import { getRecipe } from "./model.js"

import { state } from "./model.js"

import recipeView from "./views/recipeView.js"

import searchView from "./views/searchView.js"

import { getSearch } from "./model.js"

import searchView from "./views/searchView.js"

import resultsView from "./views/resultsView.js"

['hashchange', 'load'].forEach(item => window.addEventListener(item, () => {showRecipe()}))

const showRecipe = async function(){
  await getRecipe();
  recipeView.render(state.recipe);
}

const toSearchView = function () {
  searchView.searchInput(getSearch);
  resultsView.render();
}

toSearchView();

const showResSearch = async function(inputValue){
  await getSearch(val);
}