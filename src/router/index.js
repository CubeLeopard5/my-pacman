import { createRouter, createWebHashHistory } from 'vue-router'
import GameMenu from '../views/GameMenu.vue';
import PacmanGame from '../views/PacmanGame.vue';

const routes = [
	{
		path: '/',
		name: 'GameMenu',
		component: GameMenu
	},
	{
		path: '/game',
		name: 'PacmanGame',
		component: PacmanGame
	},
];
const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router