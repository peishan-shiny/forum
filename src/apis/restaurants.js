import { apiHelper } from '../utils/helpers'

//拿取存在localStorage的token，並回傳給 getToken
const getToken = () => localStorage.getItem('token')


// function getToken() {
//   return localStorage.getItem('token')
// }

export default {
  getRestaurants({ page, categoryId }) {
    //searchParams是為了產生網址上?後面的字串所new的一個物件
    const searchParams = new URLSearchParams({ page, categoryId })
    //searchParams.toString() 這個方法可以將 query 轉換成字串
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      //JWT的規範，需要打包成一個物件
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  getTopRestaurants() {
    return apiHelper.get('/restaurants/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}