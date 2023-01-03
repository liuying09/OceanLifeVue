import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Test from '../views/Test'
import paginate from '../views/paginate'
import testTwo from '../views/testTwo'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
