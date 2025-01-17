import { createRouter, createWebHistory} from 'vue-router'
import SignIn from "@/components/pages/SignIn.vue";
import SignUp from "@/components/pages/SignUp.vue";
import AuthLayout from "@/components/pages/AuthLayout.vue";

const routes = [
    {
        path: "/auth",
        component: AuthLayout,
        children: [
            {path: "/auth/sign-in", component: SignIn},
            {path: "/auth/sign-up", component: SignUp},
        ]
    }
];
// Создание роутера
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;