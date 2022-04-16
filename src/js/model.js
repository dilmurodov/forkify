import { async } from "regenerator-runtime";
import { API_URL, RESP_PER_PAGE } from "./config.js"

import { getJSON } from "./helpers.js"

export const state = {
    recipe: {},
    search: {
      query: [],
      results: {},
      page: 1,
      perPage: RESP_PER_PAGE, 
    },
}

export const getRecipe = async function() {
    const id = window.location.hash.slice(1);
    // console.log(id);
    const data = await getJSON(API_URL + id);
    const {recipe: item} = data.data;
    state.recipe = {
            id: item.id,
            img: item.image_url,
            publisher: item.publisher,
            servings: item.servings,
            title: item.title,
            time: item.cooking_time,
            ing: item.ingredients,
            url: item.source_url,
    }
    // console.log(state.recipe);
}

export const getSearch = async function (val){
  try {
    const data = await getJSON(API_URL + '?search=' + val);
    console.log(data);
    const {recipes: searchRes} = data.data;
    state.search.query.push(val);
    state.search.results = searchRes.map(item => {
        return {
            id: item.id,
            img: item.image_url,
            publisher: item.publisher,
            title: item.title
        }
    })
  } catch (err) {
    alert(err)
  }
}

export const getPaginationRecipes = async function(page = state.search.page){
  try {
    state.search.page = page;

    const startIndex = (page-1)*RESP_PER_PAGE;
    const lastIndex = (page)*RESP_PER_PAGE
    
    return state.search.results.slice(startIndex, lastIndex);

  } catch (err) {
    alert(err)
  }
}