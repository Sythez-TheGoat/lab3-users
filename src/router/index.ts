import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import UserService from '@/services/UserService'
import { useUserStore } from '@/stores/user'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import UserLayoutView from '@/views/user/LayoutView.vue'
import UserProfileView from '@/views/user/ProfileView.vue'
import UserPostsView from '@/views/user/PostsView.vue'
import UserEditView from '@/views/user/EditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') }),
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/user/:id',
      name: 'user-layout-view',
      component: UserLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = Number(to.params.id)
        const userStore = useUserStore()
        return UserService.getUser(id)
          .then((response) => {
            if (!response.data || Object.keys(response.data).length === 0) {
              return {
                name: '404-resource-view',
                params: { resource: 'user' },
              }
            } else {
              userStore.setUser(response.data)
            }
          })
          .catch(() => {
            return {
              name: '404-resource-view',
              params: { resource: 'user' },
            }
          })
      },
      children: [
        {
          path: '',
          name: 'user-profile-view',
          component: UserProfileView,
        },
        {
          path: 'posts',
          name: 'user-posts-view',
          component: UserPostsView,
        },
        {
          path: 'edit',
          name: 'user-edit-view',
          component: UserEditView,
        },
      ],
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router