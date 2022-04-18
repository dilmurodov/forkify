import { async } from 'regenerator-runtime';

import { API_URL, STEP } from './config.js';

import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
    page: 1,
    PerPage: STEP
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(API_URL + id);
    let { recipe: obj } = data.data;
    state.recipe = {
      id: obj.id,
      publisher: obj.publisher,
      image: obj.image_url,
      title: obj.title,
      servings: obj.servings,
      url: obj.source_url,
      source: obj.source_url,
      ingredients: obj.ingredients,
      time: obj.cooking_time,
    };
    if (state.bookmarks.some(val => val.id === state.recipe.id)){
      state.recipe.bookmarked = true;
    }
  } catch (err) {
    throw err;
  }
};

export const searchResults = async function (searchKey) {
  try {
    const data = await getJSON(API_URL + `?search=${searchKey}`);
    // console.log(data);
    const { recipes: getArr } = data.data;

    state.search.query = searchKey;

    state.search.results = getArr.map(item => {
      return {
        id: item.id,
        image: item.image_url,
        publisher: item.publisher,
        title: item.title,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const paginationLogic = function(page = state.search.page) {
    state.search.page = page;
    const start = (page-1)*state.search.PerPage
    const last = state.search.PerPage*page;
    console.log(state.search.results.slice(start, last));
    return state.search.results.slice(start, last);
}

export const udateServings = function(numPeople = state.recipe.servings){
  
  state.recipe.ingredients = state.recipe.ingredients.map(item => {
    item.quantity = ((item.quantity*numPeople)/state.recipe.servings);
    return item;
  });
  state.recipe.servings = numPeople;
}

export const saveBookmarks = function(recipe){
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  saveToLocaleStorage();
}

export const removeBookmarks = function(id){
  const index = state.bookmarks.findIndex(val => val.id == id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  saveToLocaleStorage();
}

export const saveToLocaleStorage = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks))
}

export const getLocaleStorage = function(){
  const arr = JSON.parse(localStorage.getItem('bookmark'));
  if(!arr) return;
  state.bookmarks = arr;
  console.log(arr);
  return arr;
}