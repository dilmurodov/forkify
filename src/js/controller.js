import { async } from "regenerator-runtime"

import * as model from "./model.js"

import recipeView from "./views/recipeView.js"

import searchView from "./views/searchView.js"

import searchView from "./views/searchView.js"

import resultsView from "./views/resultsView.js"

['hashchange', 'load'].forEach(item => window.addEventListener(item, () => {showRecipe()}))

const showRecipe = async function(){
  await model.getRecipe();
  recipeView.render(model.state.recipe);
}

const searchController = async function(){
  try {
    const inpVal = searchView.getQuery();
    await model.getSearch(inpVal);
    resultsView.render(model.state.search)
  } catch (err) {
    console.log(err)
  }
}
searchView.addHandlerEvent(searchController);

