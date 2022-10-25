import { apiHelper } from "../utils/helpers";

const getToken = () => localStorage.getItem('token')

export default {
  getCategories() {
    return apiHelper.get('/admin/categories', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addCategories(data) {
    return apiHelper.post('/admin/categories', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteCategories(categoryId) {
    return apiHelper.delete(`/admin/categories/${categoryId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateCategories({ categoryId, name }) {
    return apiHelper.put(`/admin/categories/${categoryId}`, { name }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  restaurants: {
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    get() {
      return apiHelper.get('/admin/restaurants', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  }
}