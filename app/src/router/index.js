import App from '@/App.vue'
import DataSheet from '@/views/DataSheet.vue'
import Home from '@/views/Home.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: "/DataSheet",
      name: "DataSheet",
      component: DataSheet,
    }
  ],
})

export default router
