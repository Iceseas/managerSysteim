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
        path: "question",
        name: "question",
        component: () => import ('@/views/qsManage/otherQS/common/showallquestion'),
        meta: {
          checkLogined: true,
          title: 'question',
          name:['首页','题库管理'],
          path:['/Managerindex/index','/Managerindex/question'],
          allowBack: true,
        },
      },
      {
        path: "subjectiveItem",
        name: "subjectiveItem",
        component: () => import ('@/views/qsManage/subjective/subjectiveItem'),
        meta: {
          checkLogined: true,
          title: 'subjectiveItem',
          name:['首页','题库管理','主观题'],
          path:['/Managerindex/index','/Managerindex/question','/Managerindex/subjectiveItem'],
          allowBack: true
        },
      },
      {
        path: "decide",
        name: "decide",
        component: () => import ('@/views/qsManage/otherQS/decide'),
        meta: {
          checkLogined: true,
          title: 'decide',
          name:['首页','题库管理','判断题'],
          path:['/Managerindex/index','/Managerindex/question','/Managerindex/decide'],
          allowBack: true
        },
      },
      {
        path: "single",
        name: "single",
        component: () => import ('@/views/qsManage/otherQS/single'),
        meta: {
          checkLogined: true,
          title: 'single',
          name:['首页','题库管理','单选题'],
          path:['/Managerindex/index','/Managerindex/question','/Managerindex/single'],
          allowBack: true
        },
      },
      {
        path: "vacancy",
        name: "vacancy",
        component: () => import ('@/views/qsManage/otherQS/vacancy'),
        meta: {
          checkLogined: true,
          title: 'vacancy',
          name:['首页','题库管理','填空题'],
          path:['/Managerindex/index','/Managerindex/question','/Managerindex/vacancy'],
          allowBack: true
        },
      },
      {
        path: "userCenter",
        name: "userCenter",
        component: () => import ('@/views/manager/userCenter'),
        meta: {
          checkLogined: true,
          title: 'userCenter',
          name:['首页','用户管理'],
          path:['/Managerindex/index','/Managerindex/userCenter'],
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
