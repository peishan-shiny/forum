import { apiHelper } from "../utils/helpers";

export default {
  getCategories() {
    return apiHelper.get('/admin/categories')
  },
  addCategories(data) {
    return apiHelper.post('/admin/categories', data)
  },
  deleteCategories(categoryId) {
    return apiHelper.delete(`/admin/categories/${categoryId}`)
  },
  updateCategories({ categoryId }, name) {
    return apiHelper.put(`/admin/categories/${categoryId}`, name)
  },

  restaurants: {
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData)
    },
    get() {
      return apiHelper.get('/admin/restaurants')
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    }
  }
}