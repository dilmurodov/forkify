import { async } from 'regenerator-runtime';

import { API_URL } from './config.js';

import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
  },
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
  } catch (err) {
    throw err;
  }
};

export const searchResults = async function (searchKey) {
  try {
    const data = await getJSON(API_URL + `?search=${searchKey}`);
    // console.log(data);
    const { recipes: getArr } = data.data;
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
