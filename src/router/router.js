import { createWebHistory, createRouter } from "vue-router";
import store from "@/store";
const routes = [
    { path: "/", redirect: { name: "dashboard" } },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/auth/LoginView.vue"),
        meta: {
            layout: "layout-default",
            title: "Login",
            isPublic: true,
        },
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/auth/SignupView.vue"),
        meta: {
            layout: "layout-default",
            title: "Singup",
            isPublic: true,
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/home/DashboardView.vue"),
        meta: {
            title: "Dashboard",
        },
    },
    {
        path: "/walletmangement",
        name: "walletmangement",
        component: () => import("@/views/wareHouse/WalletMangementView.vue"),
        meta: {
            title: "Warehouses",
        },
    },
    {
        path: "/warehouses/create",
        name: "createWarehouses",
        component: () => import("@/views/wareHouse/CreateWareHousesView.vue"),
        meta: {
            title: "Warehouses",
        },
    },
    {
        path: "/warehouses/edit/:id",
        name: "editWarehouses",
        component: () => import("@/views/wareHouse/EditWareHousesView.vue"),
        meta: {
            title: "Warehouses",
        },
    },
    {
        path: "/staking/application",
        name: "staking",
        component: () =>
            import("@/views/wagerMangement/StakingApplication.vue"),
        meta: {
            title: "staking",
        },
    },
    {
        path: "/staking/bettinginformation",
        name: "bettinginformation",
        component: () =>
            import("@/views/wagerMangement/WagerBettingInformation.vue"),
        meta: {
            title: "BettingInformation",
        },
    },
    {
        path: "/staking/bettingcategorysetting",
        name: "bettingcategory",
        component: () => import("@/views/DriversView.vue"),
        meta: {
            title: "BettingCategory",
        },
    },
    {
        path: "/staking/bettingrevenue",
        name: "bettingrevenue",
        component: () => import("@/views/DriversView.vue"),
        meta: {
            title: "BettingCategory",
        },
    },
    {
        path: "/browsingusers",
        name: "browsingusers",
        component: () => import("@/views/browsingUsers/BrowsingUsersView.vue"),
        meta: {
            title: "Browsing Users",
        },
    },
    {
        path: "/withdrawalmanage",
        name: "withdrawalmanage",
        component: () => import("@/views/withdrawalMange/WithdrawalView.vue"),
        meta: {
            title: "Withdrawal management",
        },
    },
    {
        path: "/usermanagement",
        name: "usermanagement",
        component: () => import("@/views/withdrawalMange/WithdrawalView.vue"),
        meta: {
            title: "Withdrawal management",
        },
    },
    {
        path: "/virtualusers",
        name: "virtualusers",
        component: () => import("@/views/withdrawalMange/WithdrawalView.vue"),
        meta: {
            title: "Withdrawal management",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

async function canUserAccess(to) {
    if (to.meta.isPublic) return true;
    try {
        const isLoggedIn = await store.getters["auth/isLoggedIn"];
        if (isLoggedIn) return true;
    } catch (error) {
        return false;
    }
}

router.beforeEach(async (to) => {
    const canAccess = await canUserAccess(to);
    if (!canAccess) return { name: "login" };
});

export default router;
