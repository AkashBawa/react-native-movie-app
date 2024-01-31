import axios from 'axios'
import  Config from '../config/api'
// import qs from 'qs'

export const getRequest = async (url) => {


  try {
    const finalUrl = `${Config.BASE_URL}${url}`;
    console.log("final url", finalUrl)
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${Config.TMDP_ACCESS_TOKEN}`
    }
    const response = await axios.get(finalUrl, { headers })

    return response;
  } catch (err) {
    console.log(err)
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