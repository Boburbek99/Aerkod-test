import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router';
import 'bootstrap/dist/js/bootstrap.js';
import '@/bootstrapSettings.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app');