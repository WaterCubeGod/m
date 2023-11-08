import Main from '../components/Main'
import Friend from '../components/routerComponents/Friend'
import MainPage from '../components/routerComponents/MainPage'
import My from '../components/routerComponents/My'
import Team from '../components/routerComponents/Team'
import Study from '../components/routerComponents/Study'
import Donation from '../components/routerComponents/Donation'
import DonationDetail from '../components/routerComponents/DonationDetail'
import Money from '../components/routerComponents/Money'
import VideoPlayer from '../components/VideoPlayer'
import Vue from 'vue'
import VueRouter from 'vue-router'
import userLogin from '../components/userLogin.vue'
import userRegister from '../components/userRegister'
import userExercise from '../components/routerComponents/userExercise'
import videoLearning from '../components/routerComponents/videoLearning'


Vue.use(VueRouter)


Vue.config.productionTip = false



const router = new VueRouter({
    routes: [
       
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
                { path: '/main/donationdetail', name: 'donationdetail', component: DonationDetail },
                { path: '/main/money', name: 'money', component: Money },
            ]
        },
        {
            path: '/study',
            name: 'study',
            component: Main,
            children: [
                { path: '/study/userExercise', name: 'userExercise', component: userExercise },
                { path: '/study/videoLearning', name: 'videoLearning', component: videoLearning },
                
            ]
        },

        
        
        {
            path: '/userRegister',
            component: userRegister,
            
        },
        {
            name:'videoPlayer',
            path:'/videoPlayer/:toID/:type',
            component:VideoPlayer,
        },
        {
            path: '/userLogin',
            component: userLogin,
            
        },
        { path: '/', redirect: '/userLogin' },
        
    ]
    
      
    
})

export default router