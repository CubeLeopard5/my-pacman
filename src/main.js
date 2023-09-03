import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';
import pacmanStore from '../store/pacman/index.js';
import routes from './router/index.js';

console.log(routes);

const store = createStore(pacmanStore);

createApp(App).use(routes).use(store).mount('#app');
