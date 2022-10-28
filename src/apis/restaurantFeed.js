import { apiHelper } from '../utils/helpers'

export default {
  getRestaurantFeed() {
    return apiHelper.get('/restaurants/feeds')
  }
}