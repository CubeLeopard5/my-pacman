<template>
	<div :style="{ 'width': `${SQUARE_SIZE * 19}px` }">
		<MapGrid/>
		<PacMan :posInGrid="{x: 1, y: 1}" @orientationChange="chnageOrientation"/>
		<div v-for="i in nbGhost" :key="i">
			<GhostEnnemy :posInGrid="{x: ghosts[i - 1].x, y: ghosts[i - 1].y}" :img="ghosts[i - 1].img"/>
		</div>
		<div class="ui-box">
			<div class="row-box">
				<button @click="add" style="height: 32px;">
					<span> Add a ghost </span>
				</button>
				<button @click="sub" style="height: 32px;">
					<span> Remove a ghost </span>
				</button>
			</div>
			<div class="row-box">
				<span> Gums left: {{ getGumLeft() }} </span>
				<span> Pacman direction: {{ pacmanOrientation }} </span>
			</div>
			<button @click="$store.state.grid = generateRandomMaze(21, 19)">
				Generate random map
			</button>
		</div>
	</div>
</template>

<script>
import MapGrid from './components/MapGrid.vue';
import PacMan from './components/PacMan.vue';
import GhostEnnemy from './components/GhostEnnemy.vue';
import constantes from '../config';

export default {
	name: 'App',
	components: {
		MapGrid,
		PacMan,
		GhostEnnemy,
	},
	data() {
        const { GUM, WALL, SQUARE_SIZE } = constantes;
        return {
            GUM,
			WALL,
			SQUARE_SIZE,
			nbGhost: 4,
			ghosts: [
				{
					x: 8,
					y: 10,
					img: "./assets/images/fantome_rouge1.gif",
				},
				{
					x: 9,
					y: 10,
					img: "./assets/images/fantome_bleu1.gif",
				},
				{
					x: 10,
					y: 10,
					img: "./assets/images/fantome_orange1.gif",
				},
				{
					x: 9,
					y: 9,
					img: "./assets/images/fantome_vert1.gif",
				},
			],
			pacmanOrientation: "right",
        }
    },
	methods: {
		add() {
			if (this.nbGhost < 4) {
				this.nbGhost++
			}
		},
		sub() {
			if (this.nbGhost > 0) {
				this.nbGhost--;
			}
		},
		chnageOrientation(value) {
			switch (value) {
				case 0:
					this.pacmanOrientation = "right";
					break;
				case 1:
					this.pacmanOrientation = "down";
					break;
				case 2:
					this.pacmanOrientation = "left";
					break;
				case 3:
					this.pacmanOrientation = "up";
					break;
				default:
					break;
			}
		},
		getGumLeft() {
            const { grid } = this.$store.state;
            let count = 0;

            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] == this.GUM) {
                        count++;
                    }
                }
            }
			if (count == 0) {
				alert("You won!");
			}
            return count;
        },
		getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		createSpace(randomGrid, i, j) {
			if (randomGrid[i][j] == this.GUM) {
				if (this.getRandomIntInclusive(0, 1) == 0) {
					randomGrid[i][j + 1] = this.GUM;
				} else {
					randomGrid[i + 1][j] = this.GUM;
				}
			} else {
				randomGrid[i][j + 1] = this.GUM;
			}
			return randomGrid;
		},
		addWallsSurrounding(randomGrid) {
			for (let i = 0; i < randomGrid.length - 1; i++) {
				randomGrid[i][randomGrid[0].length - 1] = this.WALL;
			}
			for (let i = 0; i < randomGrid[0].length; i++) {
				randomGrid[randomGrid.length - 1][i] = this.WALL;
			}
			return randomGrid;
		},
		addTeleportingSpace(randomGrid) {
			const teleport = this.getRandomIntInclusive(1, randomGrid.length - 2);

			for (let i = 0; randomGrid[teleport][i] == this.WALL; i++) {
				randomGrid[teleport][i] = 2;
			}
			for (let i = randomGrid[0].length - 1; randomGrid[teleport][i] == this.WALL; i--) {
				randomGrid[teleport][i] = 2;
			}
			return randomGrid;
		},
		generateRandomMaze(nbRows, nbColumns) {
			let randomGrid = Array.from(Array(nbRows), () => Array(nbColumns).fill(this.WALL));

			randomGrid[1][1] = this.GUM;
			for (let i = 1; i < randomGrid.length - 1; i++) {
				for (let j = 1; j < randomGrid[i].length - 1; j++) {
					randomGrid = this.createSpace(randomGrid, i, j);
				}
			}
			randomGrid = this.addWallsSurrounding(randomGrid);
			randomGrid = this.addTeleportingSpace(randomGrid);
			return randomGrid;
		},
	}
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

.ui-box {
	display: flex;
    flex-direction: column;
    gap: 12px;
	margin-top: 12px;
	border: solid 2px black;
    padding: 12px;
}

.row-box {
	display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>
