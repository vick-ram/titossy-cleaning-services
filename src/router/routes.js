import Profile from "../pages/ProfilePage.vue";
const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("pages/DashboardPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/customer",
    name: "customer",
    component: () => import("pages/CustomersPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("pages/EmployeesPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/schedule",
    name: "schedule",
    component: () => import("src/pages/ServicesPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("pages/PaymentPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/reporting",
    name: "reporting",
    component: () => import("pages/ReportsPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: () => import("../components/AdminSignIn.vue"),
  },
  {
    path: "/sign-up",
    name: "signUp",
    component: () => import("../components/AdminSignUp.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
