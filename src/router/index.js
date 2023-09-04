import { createRouter, createWebHashHistory } from 'vue-router'
import GameMenu from '../views/GameMenu.vue';
import PacmanGame from '../views/PacmanGame.vue';
import LostGame from '../views/LostGame.vue';
import WonGame from '../views/WonGame.vue';

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
	{
		path: '/lost',
		name: 'Lost',
		component: LostGame
	},
	{
		path: '/won',
		name: 'Won',
		component: WonGame
	},
];
const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router