import Vue from 'vue'
import VueRouter from 'vue-router'
import Playlistvideo from  './Playlistvideo';
import Videoexercise from  './Videoexercise';
import  Challenge from  './Challenge';
import Addvideoplaylist from "./Addvideoplaylist";
import playlistpage from "./PlaylistPage";
import UserProfile from "./UserProfile";
import Arm from "./Arm";
import Tagvideo from "./Tagvideo";
import CreateChallenge from "./CreateChallenge";
import ChallengePage from "./ChallengePage";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Login',
      component: () => import( '../views/Login')
    },
  {
    path: '/app',
    name:'app',
    component: () => import( '../views/Home'),
    children : [
      {
        path : '/Videoexercise',
        name:'Videoexercise',
        component : () => import('../views/Videoexercise/index')
      },
      Playlistvideo,
      Videoexercise,
      Challenge,
        UserProfile,
        Arm,
        Tagvideo,
      CreateChallenge,
      ChallengePage,

    ]
  },

    {
      path: '/Addvideoplaylist',
      name: 'Addvideoplaylist',
      component: () => import( '../views/AddVideoPlaylist/index')
    },
    {
      path: '/playlistpage',
      name: 'playlistpage',
      component: () => import( '../views/playlistPage/index')
    },




]

const router = new VueRouter({
  routes
})

export default router
