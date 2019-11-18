import Vue from 'vue'
import Router from 'vue-router'
import Setup from '@/views/Setup.vue'
import Play from '@/views/Play.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'setup',
            component: Setup,
            props: true
        },
        {
            path: '/play',
            name: 'play',
            component: Play,
            props: true
        }
    ]
})

export default router