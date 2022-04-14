import { async } from "regenerator-runtime"
import { getRecipe } from "./model.js"

import { state } from "./model.js"

import recipeView from "./views/recipeView.js"

import searchView from "./views/searchView.js"

['hashchange', 'load'].forEach(item => window.addEventListener(item, () => {showRecipe()}))

const showRecipe = async function(){
  await getRecipe();
  recipeView.render(state.recipe);
}

const showResSearch = async function(){
  const data = searchView.getSearch();
}
showResSearch();