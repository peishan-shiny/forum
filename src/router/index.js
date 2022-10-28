import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import signIn from '../views/signIn.vue'
import Restaurants from '../views/Restaurants.vue'
import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    // 根目錄轉到restaurants
    redirect: '/signIn'
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurants/feeds',
    name: 'restaurants-feeds',
    component: () => import('../views/RestaurantsFeeds.vue')
  },
  {
    path: '/restaurants/top',
    name: 'restaurants-top',
    component: () => import('../views/RestaurantsTop.vue')
  },
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/restaurants/:id/dashboard',
    name: 'restaurant-top',
    component: () => import('../views/RestaurantDashboard.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },
  {
    path: '/user/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/signIn',
    name: 'sign-in',
    component: signIn
  },
  {
    path: '/signUp',
    name: 'sign-up',
    // 動態載入
    component: () => import('../views/signUp.vue')
  },
  {
    //exact是指路由要完全一樣才會進來這一個
    path: '/admin',
    exact: true,
    redirect: '/admin/restaurants'
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue')
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue')
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('../views/AdminRestaurantNew.vue')
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('../views/AdminRestaurantEdit.vue')
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

//(beforeEach) 與 (beforeRouteUpdate) 類似，不過 (beforeRouteUpdate) 用於 Vue 元件內部，而 (beforeEach) 作用於整個專案，只需要在 Vue Router 內定義一次即可
//beforeRouteUpdate 只要路由有改變，就會啟動這個function
//在store裡的actions裡fetchCurrentUser方法 return true/false 在這邊傳給 isAuthenticated，驗證是否成功
router.beforeEach(async (to, from, next) => {

  //取出token
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 如果 token 存在 且 token與tokenInStore 不一樣的話再重新驗證
  if (token && token !== tokenInStore) {
    // 取得驗證成功與否
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up', 'sign-in']

  //to.name 是 beforeEach的方法，to到哪個頁面
  //當isAuthenticated驗證失敗 且 若路由是去 除了'sign-in'頁面的其他頁面，則都導到 '/signin'
  if (!isAuthenticated && to.name !== 'sign-in') {
    next('/signin')
    return
  }

  //當isAuthenticated驗證通過 且 若路由是去'sign-in' 或 'sign-up'頁面，則都導到 '/restaurants'
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/restaurants')
    return
  }

  next()
})

export default router
