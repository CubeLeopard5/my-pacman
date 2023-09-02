<template>
    <div>
        <img :src="img" alt="ghost" class="ghost" :style="ghostStyle" ref="ghost"/>
    </div>
</template>

<script>
import constantes from '../../config';

export default {
    name: "GhostEnnemy",
    mounted: function () {
        this.initGhost();
        this.timer = setInterval(this.moveGhost, constantes.GHOST_SPEED);
    },
    beforeUnmount() {
        clearInterval(this.timer)
    },
    updated() {
        if (this.doesGhostTouchPlayer() == true) {
            console.log("TOUCHED");
        }
    },
    props: {
        posInGrid: {
            type: Object,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
    },
	data() {
		return {
            timer: null,
			topPos: 0,
			leftPos: 0,
            dir: 0,
		}
	},
    computed: {
        ghostStyle() {
            return {
                top: `${this.topPos}px`,
                left: `${this.leftPos}px`,
            };
        },
    },
    methods: {
        initGhost() {
            this.dir = this.getRandomIntInclusive(0, 3);
            this.setGhostPosition();
        },
        setGhostPosition() {
            this.topPos = this.posInGrid.y * constantes.SQUARE_SIZE + constantes.SQUARE_SIZE / 4;
            this.leftPos = this.posInGrid.x * constantes.SQUARE_SIZE + constantes.SQUARE_SIZE / 4;
        },
        doesGhostTouchPlayer() {
            const posInGrid = this.getGhostPositionInGrid();
            const grid = this.$store.state.grid;
            const adjacentPositions = [
                [posInGrid.x, posInGrid.y],
                [posInGrid.x + 1, posInGrid.y],
                [posInGrid.x - 1, posInGrid.y],
                [posInGrid.x, posInGrid.y + 1],
                [posInGrid.x, posInGrid.y - 1],
            ];
            for (const [x, y] of adjacentPositions) {
                if (grid[y] && grid[y][x] === constantes.PACMAN) {
                    return true;
                }
            }
            return false;
        },
        getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        getGhostPositionInGrid() {
            const ghost = this.$refs.ghost.getBoundingClientRect();
            const centerX = (ghost.left + ghost.right) / 2;
            const centerY = (ghost.top + ghost.bottom) / 2;
            const posInGrid = {
                x: Math.floor(centerX / constantes.SQUARE_SIZE),
                y: Math.floor(centerY / constantes.SQUARE_SIZE),
            };
            return posInGrid;
        },
        teleportGhost() {
            if (this.leftPos < 0) {
                this.leftPos = this.$store.state.grid.length * constantes.SQUARE_SIZE  - (constantes.SQUARE_SIZE * 3 - constantes.SQUARE_SIZE / 4);
            } else if (this.leftPos > this.$store.state.grid.length * constantes.SQUARE_SIZE - (constantes.SQUARE_SIZE * 3 - constantes.SQUARE_SIZE / 4)) {
                this.leftPos = constantes.SQUARE_SIZE / 4;
            }
        },
        chooseDirection(grid, x, y) {
            let possibleMoves = [];

            if (this.canMoveToDirection(grid, x + 1, y)) {
                possibleMoves.push(constantes.GO_RIGHT);
            }
            if (this.canMoveToDirection(grid, x - 1, y)) {
                possibleMoves.push(constantes.GO_LEFT);
            }
            if (this.canMoveToDirection(grid, x, y + 1)) {
                possibleMoves.push(constantes.GO_UP);
            }
            if (this.canMoveToDirection(grid, x, y - 1)) {
                possibleMoves.push(constantes.GO_DOWN);
            }
            return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        },
        isThereFreeSpaceLeftRight(grid, x, y) {
            return (grid[y][x + 1] != constantes.WALL || grid[y][x - 1] != constantes.WALL);
        },
        isThereFreeSpaceUpDown(grid, x, y) {
            return (grid[y + 1][x] != constantes.WALL || grid[y - 1][x] != constantes.WALL);
        },
        goBackIfDeadEnd(grid, x, y) {
            if (this.dir == constantes.GO_DOWN && grid[y + 1][x] == constantes.WALL) {
                return constantes.GO_UP;
            } else if (this.dir == constantes.GO_UP && grid[y - 1][x] == constantes.WALL) {
                return constantes.GO_DOWN;
            } else if (this.dir == constantes.GO_RIGHT && grid[y][x + 1] == constantes.WALL) {
                return constantes.GO_LEFT;
            } else if (this.dir == constantes.GO_LEFT && grid[y][x - 1] == constantes.WALL) {
                return constantes.GO_RIGHT;
            }
            return this.dir;
        },
        computePossibleMoves() {
            const { x, y } = this.getGhostPositionInGrid();
            const { grid } = this.$store.state;

            if (this.dir == constantes.GO_DOWN || this.dir == constantes.GO_UP) {
                if (this.isThereFreeSpaceLeftRight(grid, x, y)) {
                    return this.chooseDirection(grid, x, y);
                } else {
                    return this.goBackIfDeadEnd(grid, x, y);
                }
            } else if (this.dir == constantes.GO_RIGHT || this.dir == constantes.GO_LEFT) {
                if (this.isThereFreeSpaceUpDown(grid, x, y)) {
                    return this.chooseDirection(grid, x, y);
                } else {
                    return this.goBackIfDeadEnd(grid, x, y);
                }
            }
            return this.dir;
        },
        canMoveToDirection(grid, x, y) {
            return (grid[y][x] != constantes.WALL);
        },
        moveGhost() {
            this.dir = this.computePossibleMoves();
            if (this.dir == constantes.GO_UP) {
                this.topPos += constantes.SQUARE_SIZE;
            } else if (this.dir == constantes.GO_DOWN) {
                this.topPos -= constantes.SQUARE_SIZE;
            } else if (this.dir == constantes.GO_RIGHT) {
                this.leftPos += constantes.SQUARE_SIZE;
            } else if (this.dir == constantes.GO_LEFT) {
                this.leftPos -= constantes.SQUARE_SIZE;
            }
            this.teleportGhost();
            if (this.doesGhostTouchPlayer() == true) {
                console.log("TOUCHED");
            }
        }
    }
}
</script>

<style scoped>
.ghost {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
	width: 40px;
}
</style>