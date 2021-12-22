import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Spinner from './components/ui/Spinner'

const app = createApp(App)

app.component('Spinner', Spinner)

app.use(store).use(router).mount('#app')
