import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决路由重复跳转报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.replace = function replace(location) {
    return originalPush.call(this, location).catch(err => err)
}

VueRouter.prototype.push = function replace(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 注入插件
Vue.use(VueRouter)

// 路由懒加载
const Home = () => import('../views/Home/Home.vue')
const Search = () => import('../views/Search/Search.vue')
const Order = () => import('../views/Order/Order.vue')
const Profile = () => import('../views/Profile/Profile.vue')
const Login = () => import('../views/Login/Login.vue')
const Shop = () => import('../views/Shop/Shop.vue')
const ShopFood = () => import('../views/ShopFood/ShopFood.vue')
const ShopRate = () => import('../views/ShopRate/ShopRate.vue')
const ShopInfo = () => import('../views/ShopInfo/ShopInfo.vue')


// 配置路由组件映射关系
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {
            isShowTabBar: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            isShowTabBar: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            isShowTabBar: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            isShowTabBar: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/shop',
        component: Shop,
        // 配置子级路由
        children: [
            {
                path: '/',
                redirect: 'food'
            },
            {
                path: 'food',
                component: ShopFood
            },
            {
                path: 'rate',
                component: ShopRate
            },
            {
                path: 'info',
                component: ShopInfo
            }
        ]
    },
]


const router = new VueRouter({
    routes,
    mode: 'history'  // history模式没有#
})






export default router