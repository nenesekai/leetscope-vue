import { createRouter, createWebHistory } from 'vue-router'
import Container from "@/views/Container.vue";
import AssignmentListView from "@/views/AssignmentListView.vue";
import AccountSettingsView from "@/views/AccountSettingsView.vue";
import LoginView from "@/views/LoginView.vue";
import IntroductionView from "@/views/IntroductionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/introduction',
      component: IntroductionView
    },
    {
      path: '/',
      component: Container,
      redirect: '/introduction',
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
