import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: ()=> import("../layouts/Layout.vue"),
      redirect: "/auth",
      children: [
        {
          path: "dashboard",
          component: ()=>import("../views/dashboard/Dashboard.vue")
        },
        {
          path: "user",
          component: ()=>import("../views/user/User.vue")
        },
        {
          path: "transport",
          component: ()=>import("../views/transport/Transport.vue")
        },
        {
          path: "instrument",
          component: ()=>import("../views/instrument/Instrument.vue")
        },
        {
          path: "comment/transport",
          component: ()=>import("../views/comment/TransportComment.vue")
        },
        {
          path: "comment/instrument",
          component: ()=>import("../views/comment/InstrumentComment.vue")
        }
      ]
    },
    {
      path: "/auth",
      component: ()=>import("../layouts/AuthLayout.vue"),
      redirect: "/auth/login",
      children: [
        {
          path: "login",
          component: ()=>import("../views/Auth/LoginView.vue")
        },
        {
          path: "forget",
          component: ()=>import("../views/Auth/ForgetPassword.vue")
        },
        {
          path:"verify",
          component:()=>import("../views/Auth/VerifyEmail.vue")
        }
      ]
    }
  ]
})

export default router
