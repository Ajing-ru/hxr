import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
   {
     path:'/layout',component:()=>import('../components/layout'),
     meta:{selected:'/layout'},
     children:[
        {
          path:'/menu',component:()=>import('../components/menu/index'),
          meta:{selected:'/menu'}
        },
        {
          path:'/menu/add',component:()=>import('../components/menu/info'),
          meta:{selected:'/menu'}
        },
        {
          path:'/menu/:id',component:()=>import('../components/menu/info'),
          meta:{selected:'/menu'}
        }
     ]
   }
  ]
})
