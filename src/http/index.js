import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$http', {
    get () {
      return http
    }
  })
}
