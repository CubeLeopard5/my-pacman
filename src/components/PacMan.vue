<template>
    <div>
        <img src="@/assets/images/pacman4.gif" alt="pacman" class="pacman" ref="pacman" :style="pacmanStyle"/>
    </div>
</template>

<script>
import constantes from '../../config';

export default {
    name: 'PacMan',
    props: {
        posInGrid: {
            type: Object,
            required: true,
        }
    },
    created() {
        this.topPos = this.posInGrid.y * constantes.SQUARE_SIZE + constantes.SQUARE_SIZE / 4;
        this.leftPos = this.posInGrid.x * constantes.SQUARE_SIZE + constantes.SQUARE_SIZE / 4;
        window.addEventListener('keydown', this.handleKeyDown);
    },
    mounted() {
        const posInGrid = this.getPacmanPosition();
        this.$store.state.grid[posInGrid.y][posInGrid.x] = constantes.PACMAN;
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
	data() {
		return {
			topPos: 0,
			leftPos: 0,
            pacman_width: constantes.SQUARE_SIZE,
            img_orientation: 0,
		}
	},
    computed: {
        getTopPos: function () {
			return `${this.topPos}px`;
		},
		getLeftPos: function() {
			return `${this.leftPos}px`;
		},
        pacmanStyle() {
            return {
                width: `${this.pacman_width}px`,
                top: `${this.topPos}px`,
                left: `${this.leftPos}px`,
                transform: `rotate(${this.img_orientation * 90}deg)`,
            };
        },
    },
    methods: {
        handleKeyDown(e) {
            switch (e.key) {
                case constantes.KEY_DOWN:
                    this.movePacman(constantes.GO_DOWN, 1);
                    break;
                case constantes.KEY_UP:
                    this.movePacman(constantes.GO_UP, 3);
                    break;
                case constantes.KEY_RIGHT:
                    this.movePacman(constantes.GO_RIGHT, 0);
                    break;
                case constantes.KEY_LEFT:
                    this.movePacman(constantes.GO_LEFT, 2);
                    break;
                default:
                    break;
            }
        },
        getPacmanPosition() {
            const pacman = this.$refs.pacman.getBoundingClientRect();
            const centerX = (pacman.left + pacman.right) / 2;
            const centerY = (pacman.top + pacman.bottom) / 2;
            const posInGrid = {
                x: Math.floor(centerX / constantes.SQUARE_SIZE),
                y: Math.floor(centerY / constantes.SQUARE_SIZE),
            };
            return posInGrid;
        },
        teleportPacman() {
            if (this.leftPos < 0) {
                this.leftPos = this.$store.state.grid.length * constantes.SQUARE_SIZE  - (constantes.SQUARE_SIZE * 3 - constantes.SQUARE_SIZE / 4);
            } else if (this.leftPos > this.$store.state.grid.length * constantes.SQUARE_SIZE - (constantes.SQUARE_SIZE * 3 - constantes.SQUARE_SIZE / 4)) {
                this.leftPos = constantes.SQUARE_SIZE / 4;
            }
        },
        movePacman(direction, orientation) {
            const { x, y } = this.getPacmanPosition();
            const { grid } = this.$store.state;

            if (direction === constantes.GO_DOWN && grid[y + 1][x] !== constantes.WALL) {
                this.topPos += constantes.SQUARE_SIZE;
                grid[y + 1][x] = constantes.PACMAN;
            } else if (direction === constantes.GO_UP && grid[y - 1][x] !== constantes.WALL) {
                this.topPos -= constantes.SQUARE_SIZE;
                grid[y - 1][x] = constantes.PACMAN;
            } else if (direction === constantes.GO_RIGHT && grid[y][x + 1] !== constantes.WALL) {
                this.leftPos += constantes.SQUARE_SIZE;
                grid[y][x + 1] = constantes.PACMAN;
            } else if (direction === constantes.GO_LEFT && grid[y][x - 1] !== constantes.WALL) {
                this.leftPos -= constantes.SQUARE_SIZE;
                grid[y][x - 1] = constantes.PACMAN;
            }

            grid[y][x] = constantes.EMPTY;
            this.img_orientation = orientation;
            this.teleportPacman();
        },
    }
}
</script>

<style scoped>
.pacman {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    transform: rotate(var(--rotation));
}
</style>