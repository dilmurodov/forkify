import { async } from "regenerator-runtime"

import * as model from "./model.js"

import recipeView from "./views/recipeView.js"

import searchView from "./views/searchView.js"

import searchView from "./views/searchView.js"

import resultsView from "./views/resultsView.js"
import paginationView from "./views/paginationView.js"

['hashchange', 'load'].forEach(item => window.addEventListener(item, () => {showRecipe()}))

const showRecipe = async function (){
  await model.getRecipe();
  recipeView.render(model.state.recipe);
}

const searchController = async function (){
  try {
    const inpVal = searchView.getQuery();
    await model.getSearch(inpVal);
    const data = await model.getPaginationRecipes();
    resultsView.render(data)
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err)
  }
}

const paginationController = async function (page) {
  const data = await model.getPaginationRecipes(page);
  resultsView.render(data);
  paginationView.render(model.state.search);
}


searchView.addHandlerEvent(searchController);
paginationView.addHandlerEvent(paginationController);
