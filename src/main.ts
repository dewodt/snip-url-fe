import App from './App.vue'
import './assets/main.css'
import router from './router'
import { createHead } from '@unhead/vue'
import { createApp } from 'vue'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)

app.mount('#app')
