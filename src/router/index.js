import Vue from 'vue'
import VueHead from 'vue-head'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Profile from '@/components/Profile'

Vue.use(VueHead, {
  separator: '-',
  complement: 'Pokemons'
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

router.afterEach((to, from) => {
  verifyDomain()
})

function verifyDomain () {
  let reg = new RegExp('www|sitename|test|localhost:8080')
  let parts = window.location.host.split('.')
  window.site.isSubdomain = !reg.test(parts[0])
  window.site.account_id = window.site.isSubdomain ? parts[0] : ''
}

export default router
