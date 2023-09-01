import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';
import pacmanStore from '../store/pacman/index.js';

const store = createStore(pacmanStore);

createApp(App).use(store).mount('#app');
