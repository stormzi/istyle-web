import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'
import StyhouseUser from '@/views/StyhouseUser'
import StylistUser from '@/views/StylistUser'
import Styhouses from '@/views/Styhouses'
import StyhouseDetail from '@/views/StyhouseDetail'
import StylistDetail from '@/views/StylistDetail'
import OnlineConsult from '@/views/OnlineConsult'
import AnswerConsult from '@/views/AnswerConsult'
import UserCheckConsult from '@/views/UserCheckConsult'
import StylistCheckConsult from '@/views/StylistCheckConsult'
import User from '@/views/User'
import Evaluate from '@/views/Evaluate'
import HairDesign from '@/views/HairDesign'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/styhouseUser',
      name:'StyhouseUser',
      component:StyhouseUser
    },
    {
      path:'/stylistUser',
      name:'StylistUser',
      component:StylistUser
    },
    {
      path:'/styhouses',
      name:'Styhouses',
      component:Styhouses
    },
    {
      path:'/styhouseDetail',
      name:'StyhouseDetail',
      component:StyhouseDetail
    },
    {
      path:'/stylistDetail',
      name:'StylistDetail',
      component:StylistDetail
    },
    {
      path:'/onlineConsult',
      name:'OnlineConsult',
      component:OnlineConsult
    },
    {
      path:'/answerConsult',
      name:'AnswerConsult',
      component:AnswerConsult
    },
    {
      path:'/userCheckConsult',
      name:'UserCheckConsult',
      component:UserCheckConsult
    },
    {
      path:'/stylistCheckConsult',
      name:'StylistCheckConsult',
      component:StylistCheckConsult
    },
    {
      path:'/user',
      name:'User',
      component:User
    },
    {
      path:'/evaluate',
      name:'Evaluate',
      component:Evaluate
    },
    {
      path:'/hairDesign',
      name:'HairDesign',
      component:HairDesign
    }
  ]
})
