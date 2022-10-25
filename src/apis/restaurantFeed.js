import { apiHelper } from '../utils/helpers'

const getToken = () => localStorage.getItem('token')

export default {
  getRestaurantFeed() {
    return apiHelper.get('/restaurants/feeds', {
      headers: { authorization: `Bearer ${getToken()}` }
    })
  }
}