// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http'

Vue.config.productionTip = false

Vue.use(http)

window.site = {
  isSubdomain: false,
  account_id: null,
  pokemon: {},
  loading: false,
  params: {
    title: 'List of the Pokemons',
    description: 'List of the Pokemons',
    favicon: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
    image: false,
    app: 'pokemons'
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
