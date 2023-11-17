import { createRouter, createWebHistory } from 'vue-router'
import Container from "@/views/Container.vue";
import AssignmentListView from "@/views/AssignmentListView.vue";
import AccountSettingsView from "@/views/AccountSettingsView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Container,
      redirect: '/assignments',
      children: [
        {
          path: 'assignments',
          component: AssignmentListView
        },
        {
          path: 'settings',
          component: AccountSettingsView
        },
        {
          path: 'logout',
          redirect: '/assignments'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
