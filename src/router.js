import { createRouter, createWebHistory } from "vue-router";

// DASHBOARD
import Home from "./views/Home";

// USER
import User from "./views/user/index";
import DataUser from "./components/User/User";
import AddUser from "./components/User/Add";
import EditUser from "./components/User/Edit";

// USER BRANCH
import Branch from "./views/branch/index";
import DataBranch from "./components/Branch/Branch";
import DataBranchDetail from "./components/Branch/BranchDetail";

import Login from "./views/Auth";

import store from "./store.js";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/branch",
      component: Branch,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "branch.data",
          component: DataBranch,
          meta: { title: "Manage Branch" },
        },
        {
          path: ":branch_code",
          name: "branch.branch_detail",
          component: DataBranchDetail,
          meta: { title: "Branch Detail" },
        },
      ],
    },
    {
      path: "/users",
      component: User,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "user.data",
          component: DataUser,
          meta: { title: "Manage User" },
        },
        {
          path: "add",
          name: "user.add",
          component: AddUser,
          meta: { title: "Add New User" },
        },
        {
          path: "edit/:id",
          name: "user.edit",
          component: EditUser,
          meta: { title: "Edit User" },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth;
    if (!auth) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
