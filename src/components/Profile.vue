<template>
  <div>
    <h1>{{ params.title.toUpperCase() }} ({{ pokemon.base_experience }}xp)</h1>
    <h3>{{ pokemon.species.name }}</h3>
    <h6 v-if="loading">Carregando...</h6>
    
    <img :src="`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`"/>
    
    <div class="box">
      <h4>Abilities: </h4>
      <ul><li v-for="item in pokemon.abilities">{{ item.ability.name }}</li></ul>
    </div>
    
    <div class="box">
      <h4>Stats: </h4>
      <ul><li v-for="item in pokemon.stats">{{ item.stat.name }}: {{ item.base_stat }}</li></ul>
    </div>
    
    <div class="box">
      <h4>Moves: </h4>
      <ul><li v-for="item in pokemon.moves">{{ item.move.name }}</li></ul>
    </div>
    
    <div class="box">
      <h4>Types: </h4>
      <ul><li v-for="item in pokemon.types">{{ item.type.name }}</li></ul>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'profile',
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
        inner: ('Profile').concat(' - ').concat(this.params.title)
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
          type: 'image/jpeg'
        }
      ]
    }
  },
  methods: {
    fetchDomain (subDomain) {
      this.loading = true
      this.$http.get('/pokemon/' + subDomain)
        .then((r) => {
          this.pokemon = r.data
          this.params.title = this.pokemon.name
          this.params.description = this.pokemon.name
          this.params.favicon = this.pokemon.sprites.front_default
          this.$emit('updateHead')

          console.log(this.pokemon)
          this.loading = false
        })
        .catch((e) => {
          console.log(e)
          this.loading = false
        })
    }
  },
  mounted () {
    if (window.site.isSubdomain) {
      this.fetchDomain(window.site.account_id)
    } else {
      this.$router.push({name: 'Hello'})
    }
  }
}
</script>

<style>
.box {
  text-align: left;
}
</style>
