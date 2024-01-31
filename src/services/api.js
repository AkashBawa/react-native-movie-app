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