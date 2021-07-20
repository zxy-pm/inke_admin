import Vue from 'vue'
import VueRouter from 'vue-router'
import home from "../views/home";
import order from "../views/order";
import set from '../views/set'
import channel from '../views/channel'
import sta from "../views/sta";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home/sta'
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        children: [
            {
                path: '/home/set',
                name: 'set',
                component: set
            },
            {
                path: '/home/order',
                name: 'order',
                component: order
            },
            {
                path: '/home/sta',
                name: 'sta',
                component: sta
            },
            {
                path: '/home/all_sta',
                name: 'all_sta',
                component: () => import('../views/AllSta.vue'),
            },
            {
                path: '/home/channel',
                name: 'channel',
                component: channel,
            }, {
                path: '/home/all_order',
                name: 'all_order',
                component: () => import('../views/AllOrder.vue'),
            }, {
                path: '/home/user',
                name: 'user',
                component: () => import('../views/User.vue'),
            }, {
                path: '/home/change',
                name: 'change',
                component: () => import('../views/Change.vue'),
            }, {
                path: '/home/all_change',
                name: 'all_change',
                component: () => import('../views/AllChange.vue'),
            }, {
                path: '/home/my_sta',
                name: 'my_sta',
                component: () => import('../views/MySta.vue'),
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },


]

const router = new VueRouter({
    routes
})

export default router
