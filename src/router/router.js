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
            roles: [1, 2, 3],
        },
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import("@/views/settings/SettingsView.vue"),
        meta: {
            title: "Warehouses",
            roles: [1],
        },
    },
    {
        path: "/meta-test",
        name: "meta-test",
        component: () => import("@/views/settings/MetaTest.vue"),
        meta: {
            title: "Warehouses",
            roles: [1],
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
        name: "staking-applications",
        component: () =>
            import("@/views/stakingManagement/StakingApplications.vue"),
        meta: {
            title: "staking",
            roles: [1],
        },
    },
    {
        path: "/staking/categories",
        name: "staking-categories",
        component: () =>
            import("@/views/stakingManagement/StakingCategories.vue"),
        meta: {
            title: "BettingCategory",
            roles: [1, 2],
        },
    },
    {
        path: "/staking/application/?confirmed=1",
        name: "confirmed-staking-categories",
        component: () =>
            import("@/views/stakingManagement/StakingApplications.vue"),
        meta: {
            title: "BettingInformation",
            roles: [1, 2],
        },
    },
    {
        path: "/withdrawal",
        name: "withdrawal-management",
        component: () => import("@/views/withdrawalMange/WithdrawalView.vue"),
        meta: {
            title: "Withdrawal",
            roles: [1],
        },
    },
    {
        path: "/users",
        name: "all-users",
        component: () => import("@/views/browsingUsers/Customers.vue"),
        meta: {
            title: "Browsing Users",
            roles: [1, 2, 3],
        },
    },
    {
        path: "/users/?virtual=0",
        name: "real-users",
        component: () => import("@/views/browsingUsers/Customers.vue"),
        meta: {
            title: "Browsing Users",
            roles: [1, 2, 3],
        },
    },
    {
        path: "/users/?virtual=1",
        name: "virtual-users",
        component: () => import("@/views/browsingUsers/Customers.vue"),
        meta: {
            title: "Browsing Users",
            roles: [1, 2, 3],
        },
    },
    {
        path: "/users/?invitation",
        name: "invitation-manage",
        component: () => import("@/views/browsingUsers/Customers.vue"),
        meta: {
            title: "Browsing Users",
            roles: [1, 2, 3],
        },
    },
    {
        path: "/users/?approved=1",
        name: "approved-users",
        component: () => import("@/views/browsingUsers/Customers.vue"),
        meta: {
            title: "Browsing Users",
            roles: [1, 2, 3],
        },
    },
    {
        path: "/search-records",
        name: "search-records",
        component: () => import("@/views/searchRecords/SearchRecords.vue"),
        meta: {
            title: "Withdrawal",
            roles: [1],
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
        const { isLoggedIn, role } = await store.getters["auth/isLoggedIn"];
        if (isLoggedIn && to.meta.roles.includes(role)) return true;
    } catch (error) {
        return false;
    }
}

router.beforeEach(async (to) => {
    const canAccess = await canUserAccess(to);
    if (!canAccess) return { name: "login" };
});

export default router;
