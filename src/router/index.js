import { createRouter, createWebHistory } from 'vue-router'
import Tradeview from '../pages/Tradeview.vue'

const routes = [
  { path: '/', redirect: '/tradeview' },
  {
    path: '/tradeview',
    component: Tradeview
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
