import { createRouter, createWebHistory} from 'vue-router'
import SignIn from "@/components/pages/SignIn.vue";
import SignUp from "@/components/pages/SignUp.vue";

const routes = [
    {
        path: "/SignUp",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/SignIn",
        name: "SignIn",
        component: SignIn,
    },
];
// Создание роутера
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;