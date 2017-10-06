<template>
  <div class="hello">
    <h1>{{ params.title }}</h1>
    <h6 v-if="loading">Carregando...</h6>
    
    <div v-if="!isSubdomain && !loading">
      <h2>Pokemons Links</h2>
      <ul v-for="pokemon in list">
        <li><a :href="`http://${pokemon.name}.localhost:8080`">{{ pokemon.name }}</a></li>
      </ul>
    </div>

    <div v-if="isSubdomain && !loading">
      <router-link :to="{ name: 'Profile' }">
        <img :src="`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`" :title="pokemon.name"/>
      </router-link>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      pokemon: {},
      loading: false,
      params: {
        title: '',
        app: '',
        description: '',
        image: '',
        favicon: ''
      },
      list: []
    }
  },
  computed: {
    isSubdomain: () => window.site.isSubdomain
  },
  head: {
    title () {
      return {
        inner: this.params.title
      }
    },
    meta () {
      return [
        { name: 'application-name', content: this.params.app },
        { name: 'description', content: this.params.description },
        { name: 'twitter:description', content: this.params.description },
        { name: 'twitter:title', content: this.params.title },
        { property: 'og:image', content: this.params.image }
      ]
    },
    link () {
      return [
        {
          rel: 'icon',
          href: this.params.favicon,
          sizes: '16x16',
          type: 'image/jpeg'
        }
      ]
    }
  },
  methods: {
    fetch () {
      this.loading = true
      this.$http.get('/pokemon')
        .then((r) => {
          this.list = r.data.results
          this.loading = false
        })
        .catch((e) => {
          console.log(e)
          this.loading = false
        })
    },
    fetchDomain (subDomain) {
      this.loading = true
      this.$http.get('/pokemon/' + subDomain)
        .then((r) => {
          this.pokemon = r.data
          this.params.title = this.pokemon.name
          this.params.description = this.pokemon.name
          this.params.favicon = ('https://img.pokemondb.net/artwork/').concat(this.pokemon.name).concat('.jpg')
          this.$emit('updateHead')

          this.loading = false
        })
        .catch((e) => {
          console.log(e)
          this.loading = false
        })
    }
  },
  mounted () {
    if (!window.site.isSubdomain) {
      this.fetch()
    } else {
      this.fetchDomain(window.site.account_id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
