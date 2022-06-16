import { createWebHistory, createRouter } from 'vue-router'
import store from "@/store";
const routes = [
  { path: '/', redirect: { name: 'dashboard' } },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'layout-default',
      title: 'Login',
      isPublic: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/home/DashboardView.vue'),
    meta: {
      title: 'Dashboard',
    },
  },
  {
    path: '/warehouses',
    name: 'warehouses',
    component: () => import('@/views/wareHouse/WareHousesView.vue'),
    meta: {
      title: 'Warehouses',
    },
  },
  {
    path: '/warehouses/create',
    name: 'createWarehouses',
    component: () => import('@/views/wareHouse/CreateWareHousesView.vue'),
    meta: {
      title: 'Warehouses',
    },
  },
  {
    path: '/warehouses/edit/:id',
    name: 'editWarehouses',
    component: () => import('@/views/wareHouse/EditWareHousesView.vue'),
    meta: {
      title: 'Warehouses',
    },
  },
  {
    path: '/drivers',
    name: 'drivers',
    component: () => import('@/views/DriversView.vue'),
    meta: {
      title: 'Drivers',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



async function canUserAccess(to) {
  if (to.meta.isPublic) return true
  try {
    const isLoggedIn = await store.getters['auth/isLoggedIn']
    console.log("isLoggedIn",isLoggedIn)
    if (isLoggedIn) return true
  } catch (error) {
    return false
  }
}

router.beforeEach(async (to) => {
  // canUserAccess() returns `true` or `false`
  const canAccess = await canUserAccess(to)
  if (!canAccess) return { name: 'login' }
})

export default router
