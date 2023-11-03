import Main from '../components/Main'
import Friend from '../components/routerComponents/Friend'
import MainPage from '../components/routerComponents/MainPage'
import My from '../components/routerComponents/My'
import Team from '../components/routerComponents/Team'
import Donation from '../components/routerComponents/Donation'
import Study from '../components/routerComponents/Study'

import Vue from 'vue'
import VueRouter from 'vue-router'
import userLogin from '../components/userLogin.vue'
import userRegister from '../components/userRegister'



Vue.use(VueRouter)


Vue.config.productionTip = false



const router = new VueRouter({
    routes: [
        {
            path: '/userLogin',
            component: userLogin,
            
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            children: [
                { path: '/main/friend', name: 'friend', component: Friend },
                { path: '/main/main', name: 'myMain', component: MainPage },
                { path: '/main/my', name: 'my', component: My },
                { path: '/main/team', name: 'team', component: Team },
                { path: '/main/donation', name: 'donation', component: Donation },
                { path: '/main/study', name: 'study', component: Study },
            ]
        },
        {
            path: '/userRegister',
            component: userRegister,
            
        },
        { path: '/', redirect: '/userRegister' },
    ]
      
    
})

export default router