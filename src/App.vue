<template>
	<div>
		<MapGrid/>
		<PacMan/>
		<GhostEnnemy/>
	</div>
</template>

<script>
import MapGrid from './components/MapGrid.vue';
import PacMan from './components/PacMan.vue';
import GhostEnnemy from './components/GhostEnnemy.vue';

export default {
	name: 'App',
	components: {
		MapGrid,
		PacMan,
		GhostEnnemy,
	},
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
