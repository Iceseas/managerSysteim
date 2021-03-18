import Vue from "vue";
import VueRouter from "vue-router";
import { getCookie } from "@/util/cookie";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta:{
      allowBack: false,
      title:'首页',
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
          title: '首页',
          name:['首页'],
          selfpath:'首页-/Managerindex/index',
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
          title: '访问记录',
          selfpath:'访问记录-/Managerindex/accesslog',
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
          title: '题库管理',
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
          title: '主观题',
          selfpath:'主观题-/Managerindex/subjectiveItem',
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
          title: '判断题',
          selfpath:'判断题-/Managerindex/decide',
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
          title: '单选题',
          selfpath:'单选题-/Managerindex/single',
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
          title: '填空题',
          selfpath:'填空题-/Managerindex/vacancy',
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
          title: '用户管理',
          selfpath:'用户管理-/Managerindex/userCenter',
          name:['首页','用户管理'],
          path:['/Managerindex/index','/Managerindex/userCenter'],
          allowBack: true
        },
      },
      {
        path: "form",
        name: "form",
        component: () => import ('@/views/from/form'),
        meta: {
          checkLogined: true,
          title: '拖拽表单页',
          selfpath:'拖拽表单页-/Managerindex/form',
          name:['首页','拖拽表单页'],
          path:['/Managerindex/index','/Managerindex/form'],
          allowBack: true
        },
      },
      {
        path: "gateController",
        name:"gateController",
        component: () => import ('@/views/gateController/gateController'),
        meta: {
          checkLogined: true,
          title: '大闸控制demo',
          selfpath:'大闸控制demo-/Managerindex/gateController',
          name:['首页','大闸控制demo'],
          path:['/Managerindex/index','/Managerindex/gateController'],
          allowBack: true
        },
      },
      {
        path: "powerControl",
        name: "powerControl",
        component: () => import ('@/views/manager/powerControl'),
        meta: {
          checkLogined: true,
          title: '权限管理',
          selfpath:'权限管理-/Managerindex/powerControl',
          name:['首页','权限管理'],
          path:['/Managerindex/index','/Managerindex/powerControl'],
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
  routes,
});
// 页面检查cookie是否含有token
router.beforeEach((to, from, next) => {
  // 改变页面title
  if(to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.checkLogined) {
    if (getCookie("token") == null) {
      alert('首先登录系统！')
      next("login");
    } else {
      next();
    }
  } else {
    next();
  }
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
  router.replace(targetPath);
  }
  });
export default router;
