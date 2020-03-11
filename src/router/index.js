import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Life = () => import('../views/life')

const routes = [
  { path: '/', name: 'Life', component: Life },
]
const router = new VueRouter({
  routes
});

export default router;
