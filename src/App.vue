<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    loading: () => window.site.loading,
    title: () => window.site.params.title,
    app: () => window.site.params.app,
    description: () => window.site.params.description,
    image: () => window.site.params.image,
    favicon: () => window.site.params.favicon
  },
  head: {
    title () {
      return {
        inner: this.title
      }
    },
    meta () {
      return [
        { name: 'application-name', content: this.app },
        { name: 'description', content: this.description },
        { name: 'twitter:description', content: this.description },
        { name: 'twitter:title', content: this.title },
        { property: 'og:image', content: this.image }
      ]
    },
    link () {
      return [
        {
          rel: 'icon',
          href: this.favicon,
          sizes: '16x16',
          type: 'image/jpeg'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
