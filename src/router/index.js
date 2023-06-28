import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Buku from '../views/BukuView.vue'
import Kategori from '../views/KategoriView.vue'
import Anggota from '../views/AnggotaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/buku',
      name: 'Buku',
      component: Buku,
    },
    {
      path: '/kategori',
      name: 'Kategori',
      component: Kategori,
    },
    {
      path: '/anggota',
      name: 'Anggota',
      component: Anggota,
    },
    {
      //path: '/kategori',
      //name: 'kategori',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/KategoriView.vue')
    }
  ]
})

export default router
