import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import("@/views/HomeView.vue"),
        },
        // {
        //     path: "login",
        //     name: "login",
        //     component: () => import("@/views/LoginViews.vue"),
        //     // meta: { requiresUnauth: true },
        // },
        // {
        //     path: "/signUp",
        //     name: "signUp",
        //     component: () => import("@/views/SignUpViews.vue"),
        //     // meta: { requiresUnauth: true },
        // },
    ]
})
// import { useAuthStore } from "@/stores/authStore.js";

// router.beforeEach((to, from, next) => {
//     const authService = useAuthStore();
//     const isAuthenticated = authService.isActiveUser;
//     if (to.meta.requiresAuth && !isAuthenticated) {
//         next("/login");
//     } else
//         if (to.meta.requiresUnauth && isAuthenticated) {
//             next("/");
//         } else {
//             next();
//         }
// });
export default router;