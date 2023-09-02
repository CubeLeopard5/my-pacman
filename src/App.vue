<template>
	<div>
		<MapGrid/>
		<PacMan :posInGrid="{x: 1, y: 1}"/>
		<GhostEnnemy :posInGrid="{x: 8, y: 10}" img="./assets/images/fantome_rouge1.gif"/>
		<GhostEnnemy :posInGrid="{x: 9, y: 10}" img="./assets/images/fantome_bleu1.gif"/>
		<GhostEnnemy :posInGrid="{x: 10, y: 10}" img="./assets/images/fantome_orange1.gif"/>
		<GhostEnnemy :posInGrid="{x: 9, y: 9}" img="./assets/images/fantome_vert1.gif"/>
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
