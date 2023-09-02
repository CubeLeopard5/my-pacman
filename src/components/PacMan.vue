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
        this.topPos = this.posInGrid.y * this.SQUARE_SIZE + this.SQUARE_SIZE / 4;
        this.leftPos = this.posInGrid.x * this.SQUARE_SIZE + this.SQUARE_SIZE / 4;
        window.addEventListener('keydown', this.handleKeyDown);
    },
    mounted() {
        const posInGrid = this.getPacmanPosition();
        this.$store.state.grid[posInGrid.y][posInGrid.x] = this.PACMAN;
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
	data() {
        const { SQUARE_SIZE, PACMAN, KEY_DOWN,
                KEY_UP, KEY_RIGHT, KEY_LEFT,
                GO_DOWN, GO_UP, GO_RIGHT,
                GO_LEFT, WALL, EMPTY,
                PACMAN_SPEED }
            = constantes;
		return {
			topPos: 0,
			leftPos: 0,
            pacman_width: SQUARE_SIZE,
            img_orientation: 0,
            SQUARE_SIZE,
            PACMAN,
            KEY_DOWN,
            KEY_UP,
            KEY_RIGHT,
            KEY_LEFT,
            GO_DOWN,
            GO_UP,
            GO_RIGHT,
            GO_LEFT,
            WALL,
            EMPTY,
            PACMAN_SPEED,
            waitForNextTick: false,
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
                transition: `all ${this.PACMAN_SPEED}ms ease`,
            };
        },
    },
    methods: {
        handleKeyDown(e) {
            if (this.waitForNextTick == false) {
                switch (e.key) {
                    case this.KEY_DOWN:
                        this.movePacman(this.GO_DOWN, 1);
                        break;
                    case this.KEY_UP:
                        this.movePacman(this.GO_UP, 3);
                        break;
                    case this.KEY_RIGHT:
                        this.movePacman(this.GO_RIGHT, 0);
                        break;
                    case this.KEY_LEFT:
                        this.movePacman(this.GO_LEFT, 2);
                        break;
                    default:
                        break;
                }
                this.waitForNextTick = true;
                setTimeout(() => {
                    this.waitForNextTick = false;
                }, this.PACMAN_SPEED);
            }
        },
        getPacmanPosition() {
            const pacman = this.$refs.pacman.getBoundingClientRect();
            const centerX = (pacman.left + pacman.right) / 2;
            const centerY = (pacman.top + pacman.bottom) / 2;
            const posInGrid = {
                x: Math.floor(centerX / this.SQUARE_SIZE),
                y: Math.floor(centerY / this.SQUARE_SIZE),
            };
            return posInGrid;
        },
        teleportPacman() {
            const rightPlace = this.$store.state.grid.length * this.SQUARE_SIZE - (this.SQUARE_SIZE * 3 - this.SQUARE_SIZE / 4);
            const leftPlace = this.SQUARE_SIZE / 4;

            if (this.leftPos < leftPlace) {
                this.leftPos = rightPlace;
            } else if (this.leftPos > rightPlace) {
                this.leftPos = leftPlace;
            }
        },
        movePacman(direction, orientation) {
            const { x, y } = this.getPacmanPosition();
            const { grid } = this.$store.state;

            if (direction === this.GO_DOWN && grid[y + 1][x] !== this.WALL) {
                this.topPos += this.SQUARE_SIZE;
                grid[y + 1][x] = this.PACMAN;
            } else if (direction === this.GO_UP && grid[y - 1][x] !== this.WALL) {
                this.topPos -= this.SQUARE_SIZE;
                grid[y - 1][x] = this.PACMAN;
            } else if (direction === this.GO_RIGHT && grid[y][x + 1] !== this.WALL) {
                this.leftPos += this.SQUARE_SIZE;
                grid[y][x + 1] = this.PACMAN;
            } else if (direction === this.GO_LEFT && grid[y][x - 1] !== this.WALL) {
                this.leftPos -= this.SQUARE_SIZE;
                grid[y][x - 1] = this.PACMAN;
            }

            grid[y][x] = this.EMPTY;
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