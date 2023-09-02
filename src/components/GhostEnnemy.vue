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
        this.timer = setInterval(this.moveGhost, this.GHOST_SPEED);
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
        const { SQUARE_SIZE, PACMAN, KEY_DOWN,
                KEY_UP, KEY_RIGHT, KEY_LEFT,
                GO_DOWN, GO_UP, GO_RIGHT,
                GO_LEFT, WALL, GHOST_SPEED }
            = constantes;
		return {
            timer: null,
			topPos: 0,
			leftPos: 0,
            dir: 0,
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
            GHOST_SPEED,
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
            this.topPos = this.posInGrid.y * this.SQUARE_SIZE + this.SQUARE_SIZE / 4;
            this.leftPos = this.posInGrid.x * this.SQUARE_SIZE + this.SQUARE_SIZE / 4;
        },
        doesGhostTouchPlayer() {
            const posInGrid = this.getGhostPositionInGrid();
            const { grid } = this.$store.state;
            const adjacentPositions = [
                [posInGrid.x, posInGrid.y],
                [posInGrid.x + 1, posInGrid.y],
                [posInGrid.x - 1, posInGrid.y],
                [posInGrid.x, posInGrid.y + 1],
                [posInGrid.x, posInGrid.y - 1],
            ];
            for (const [x, y] of adjacentPositions) {
                if (grid[y] && grid[y][x] == this.PACMAN) {
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
                x: Math.floor(centerX / this.SQUARE_SIZE),
                y: Math.floor(centerY / this.SQUARE_SIZE),
            };
            return posInGrid;
        },
        teleportGhost() {
            const rightPlace = this.$store.state.grid.length * this.SQUARE_SIZE - (this.SQUARE_SIZE * 3 - this.SQUARE_SIZE / 4);
            const leftPlace = this.SQUARE_SIZE / 4;

            if (this.leftPos < leftPlace) {
                this.leftPos = rightPlace;
            } else if (this.leftPos > rightPlace) {
                this.leftPos = leftPlace;
            }
        },
        chooseDirection(grid, x, y) {
            let possibleMoves = [];

            if (this.canMoveToDirection(grid, x + 1, y)) {
                possibleMoves.push(this.GO_RIGHT);
            }
            if (this.canMoveToDirection(grid, x - 1, y)) {
                possibleMoves.push(this.GO_LEFT);
            }
            if (this.canMoveToDirection(grid, x, y + 1)) {
                possibleMoves.push(this.GO_UP);
            }
            if (this.canMoveToDirection(grid, x, y - 1)) {
                possibleMoves.push(this.GO_DOWN);
            }
            return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        },
        isThereFreeSpaceLeftRight(grid, x, y) {
            return (grid[y][x + 1] != this.WALL || grid[y][x - 1] != this.WALL);
        },
        isThereFreeSpaceUpDown(grid, x, y) {
            return (grid[y + 1][x] != this.WALL || grid[y - 1][x] != this.WALL);
        },
        goBackIfDeadEnd(grid, x, y) {
            if (this.dir == this.GO_DOWN && grid[y + 1][x] == this.WALL) {
                return this.GO_UP;
            } else if (this.dir == this.GO_UP && grid[y - 1][x] == this.WALL) {
                return this.GO_DOWN;
            } else if (this.dir == this.GO_RIGHT && grid[y][x + 1] == this.WALL) {
                return this.GO_LEFT;
            } else if (this.dir == this.GO_LEFT && grid[y][x - 1] == this.WALL) {
                return this.GO_RIGHT;
            }
            return this.dir;
        },
        computePossibleMoves() {
            const { x, y } = this.getGhostPositionInGrid();
            const { grid } = this.$store.state;

            if (this.dir == this.GO_DOWN || this.dir == this.GO_UP) {
                if (this.isThereFreeSpaceLeftRight(grid, x, y)) {
                    return this.chooseDirection(grid, x, y);
                } else {
                    return this.goBackIfDeadEnd(grid, x, y);
                }
            } else if (this.dir == this.GO_RIGHT || this.dir == this.GO_LEFT) {
                if (this.isThereFreeSpaceUpDown(grid, x, y)) {
                    return this.chooseDirection(grid, x, y);
                } else {
                    return this.goBackIfDeadEnd(grid, x, y);
                }
            }
            return this.dir;
        },
        canMoveToDirection(grid, x, y) {
            return (grid[y][x] != this.WALL);
        },
        moveGhost() {
            this.dir = this.computePossibleMoves();
            if (this.dir == this.GO_UP) {
                this.topPos += this.SQUARE_SIZE;
            } else if (this.dir == this.GO_DOWN) {
                this.topPos -= this.SQUARE_SIZE;
            } else if (this.dir == this.GO_RIGHT) {
                this.leftPos += this.SQUARE_SIZE;
            } else if (this.dir == this.GO_LEFT) {
                this.leftPos -= this.SQUARE_SIZE;
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