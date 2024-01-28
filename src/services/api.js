import axios from 'axios'
import  Config from '../config/api'
// import qs from 'qs'

export const getRequest = async (url) => {


  try {
    const finalUrl = `${Config.BASE_URL}${url}`;
    console.log("final url", finalUrl)
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTNlYzAwNGQ3MzExOTVjNDlkMDlmYzk4MzQ4ZWMwNiIsInN1YiI6IjY0MzU4N2NiMDZmOTg0MDA3Njk1MzljZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O4c1T9DsWcrskIxEbjsopSR0wW59Wxn2NGxrLPK5BA8'
    }
    const response = await axios.get(finalUrl, { headers })
    // console.log(response)
    return response;
  } catch (err) {
    throw err;
  }

}

export const getRecipes = async ingredient => {
  const url = BASE_URL

  try {
    const params = {
      q: ingredient,
      app_id: APP_ID,
      app_key: APP_KEY,
      type: TYPE,
      field: ['url', 'image', 'label', 'source']
    }

    // console.log('getting recipes')
    const recipeAxios = axios.create({
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })

    const response = await recipeAxios.get(url, { params })

    return response
  } catch (error) {
    throw error
  }
}