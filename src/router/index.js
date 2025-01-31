import { createRouter, createWebHistory } from "vue-router";
import PasswordList from "@/components/PasswordList.vue";
import PasswordForm from "@/components/PasswordForm.vue";
import PasswordGenerator from "@/components/PasswordGenerator.vue"
const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/', name: 'passwordManager', component: () => import("@/views/PasswordManagerView.vue"),
            children: [
                { path: '/list', name: 'list', component: PasswordList },
                { path: '/form', name: 'form', component: PasswordForm },
                { path: '/generate', name: 'generate', component: PasswordGenerator },
            ]
        },
    ],
})

export default router;
