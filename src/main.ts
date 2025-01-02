import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(router)
app.use(VCalendar, {})

app.mount('#app')
