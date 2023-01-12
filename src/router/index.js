import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Test from '../views/Test'
import paginate from '../views/paginate'
import testTwo from '../views/testTwo'
import imageShow from '../views/imageShow'
import ArticleEdit from '../views/ArticleEdit'
import addProduct from '../views/addProduct'
import ProductEdit from '../views/ProductEdit'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/paginate',
    name: 'paginate',
    component: paginate
  },
  {
    path: '/testTwo',
    name: 'testTwo',
    component: testTwo
  },
  {
    path: '/imageShow',
    name: 'imageShow',
    component: imageShow
  },
  {
    path: '/ArticleEdit',
    name: 'ArticleEdit',
    component: ArticleEdit
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: addProduct
  },
  {
    path: '/ProductEdit',
    name: 'ProductEdit',
    component: ProductEdit
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
