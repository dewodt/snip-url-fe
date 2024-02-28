import App from './App.vue'
import './assets/main.css'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createHead } from '@unhead/vue'
import { createApp } from 'vue'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.use(VueQueryPlugin)

app.mount('#app')
