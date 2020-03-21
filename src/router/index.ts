import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'

const Main = () => import("@/views/Main.vue");
const LeaveMessageModule = () => import("@/components/pages/leave-message/index.vue")
const ArticleInfoModule = () => import("@/components/pages/article-info/index.vue")
const DashboardModule = () => import("@/components/pages/dashboard-manage/index.vue")
const SearchModule = () => import("@/components/pages/search-manage/index.vue")
const FriednlyLinkModule = () => import("@/components/pages/links/index.vue")
const AboutModule = () => import("@/components/pages/about/index.vue")
const TypeModule = () => import("@/components/pages/type-article/index.vue")
const NotFoundModule = () => import("@/components/404.vue")
const GithubLogin = () => import("@/components/GithubSingn.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/app',
    meta: { name: "首页" },
    children: [
      {
        path: '/app',
        component: DashboardModule,
        meta: { name: "首页" }
      },
      {
        path: '/leave_message',
        component: LeaveMessageModule,
        meta: { name: "留言板" }
      },
      {
        path: '/article/:id',
        component: ArticleInfoModule,
        meta: { name: "文章详情" }
      },
      {
        path: '/search',
        component: SearchModule,
        meta: { name: "搜索" }
      },
      {
        path: '/type/:type',
        component: TypeModule,
        meta: { name: "模块" }
      },
      {
        path: '/links',
        component: FriednlyLinkModule,
        meta: { name: "友情链接" }
      },
      {
        path: '/about',
        component: AboutModule,
        meta: { name: "关于我们" }
      },
      {
        path: '/404',
        component: NotFoundModule,
      },
    ],
    //每次路由跳转后滚轮置顶
    scrollBehavior(to:Route, from:Route, savedPosition:Function) {
      // return 期望滚动到哪个的位置
      return {
        x: 0,
        y: 0
      }
    }
  },
  {
    path: '/signin_github',
    component: GithubLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
