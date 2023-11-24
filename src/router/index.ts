import { createRouter, createWebHistory } from 'vue-router'
import Container from "@/views/Container.vue";
import AssignmentListView from "@/views/AssignmentListView.vue";
import AccountSettingsView from "@/views/AccountSettingsView.vue";
import LoginView from "@/views/LoginView.vue";
import IntroductionView from "@/views/IntroductionView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AssignmentDetailView from "@/views/AssignmentDetailView.vue";
import NewAssignmentView from "@/views/NewAssignmentView.vue";
import EditAssignmentView from "@/views/EditAssignmentView.vue";

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
        },
        {
          path: '/assignmentDetail/:id',
          component: AssignmentDetailView
        },
        {
          path: '/newAssignment',
          component: NewAssignmentView
        },
        {
          path: '/editAssignment/:id',
          component: EditAssignmentView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router
