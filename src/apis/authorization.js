//apiHelper記得要加{}
import { apiHelper } from "../utils/helpers";

// const getToken = () => localStorage.getItem('token')

export default {
  signIn({ email, password }) {
    return apiHelper.post('/signIn', {
      email,
      password
    })
  },
  signUp(data) {
    return apiHelper.post('/signup', data)
  }
}