import Vue from "vue";
import VueRouter from "vue-router";
import { getCookie } from "@/util/cookie";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta:{
      allowBack: false
    },
    component: () => import ('@/views/userlogin/login'),
  },
  {
    path: "/Managerindex",
    name: "Managerindex",
    component: () => import ('@/views/home/managerSystemIndex'),
    meta: {
      checkLogined: true,
      title: 'Managerindex'
    },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import ('@/views/home/managerSystemIndex/index'),
        meta: {
          checkLogined: true,
          title: 'index',
          name:['首页'],
          path:['/Managerindex/index'],
          allowBack: false
        },
      },
      {
        path: "accesslog",
        name: "accesslog",
        component: () => import ('@/views/manager/accesslog'),
        meta: {
          checkLogined: true,
          title: 'accesslog',
          name:['首页','访问记录'],
          path:['/Managerindex/index','/Managerindex/accesslog'],
          allowBack: true
        },
      },
      {
        path: "showallquestion",
        name: "showallquestion",
        component: () => import ('@/views/qsManage/otherQS/common/showallquestion'),
        meta: {
          checkLogined: true,
          title: 'showallquestion',
          name:['首页','其他题型'],
          path:['/Managerindex/index','/Managerindex/showallquestion'],
          allowBack: true
        },
      },
      {
        path: "showTable",
        name: "showTable",
        component: () => import ('@/views/qsManage/otherQS/showTable'),
        meta: {
          checkLogined: true,
          title: 'showTable',
          name:['首页','其他题型','列表'],
          path:['/Managerindex/index','/Managerindex/showallquestion','/Managerindex/showTable'],
          allowBack: true
        },
      },
      {
        path: "subjectiveItem",
        name: "subjectiveItem",
        component: () => import ('@/views/qsManage/subjective/subjectiveItem'),
        meta: {
          checkLogined: true,
          title: 'subjectiveItem',
          name:['首页','主观题'],
          path:['/Managerindex/index','/Managerindex/subjectiveItem'],
          allowBack: true
        },
      },
      {
        path: "",
        redirect: "index",
      },
    ],
  },
  {
    path: "",
    redirect: "/login",
  },
];
const router = new VueRouter({
  mode: "history",
  //base: process.env.BASE_URL,
  // linkActiveClass:'' 设置点击的样式
  routes,
});
// 页面检查cookie是否含有token
router.beforeEach((to, from, next) => {
  if (to.meta.checkLogined) {
    if (getCookie("token") == null) {
      next("login");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
