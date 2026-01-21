import './assets/main.css'

import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import App from './App.vue'
import Home from './pages/Home.vue';
import Favor from './pages/Favor.vue';

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home',  component: Home },
  { path: '/favorites',name: 'Favor', component: Favor },
]

const router = createRouter ({
    history: createWebHistory(),
    routes
})
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
