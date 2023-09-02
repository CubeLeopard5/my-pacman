<template>
    <div>
        <img :src="img" alt="ghost" class="ghost" v-bind:style="{ 'top': getTopPos, 'left': getLeftPos }" ref="ghost"/>
    </div>
</template>

<script>
export default {
    name: "GhostEnnemy",
    mounted: function () {
        this.dir = this.getRandomIntInclusive(0, 3);
        this.timer = setInterval(() => {
            this.moveGhost()
        }, 300);
        this.topPos = this.posInGrid.y * 40 + 10;
        this.leftPos = this.posInGrid.x * 40 + 10;
    },
    beforeUnmount() {
        clearInterval(this.timer)
    },
    updated() {
        const ghost = this.$refs.ghost.getBoundingClientRect();
            const centerX = (ghost.left + ghost.right) / 2;
            const centerY = (ghost.top + ghost.bottom) / 2;
            const posInGrid = {
                x: Math.floor(centerX / 40),
                y: Math.floor(centerY / 40),
            };
        if (this.$store.state.grid[posInGrid.y][posInGrid.x] == 3 || this.$store.state.grid[posInGrid.y][posInGrid.x + 1] == 3
        || this.$store.state.grid[posInGrid.y][posInGrid.x - 1] == 3 || this.$store.state.grid[posInGrid.y + 1][posInGrid.x] == 3
        || this.$store.state.grid[posInGrid.y - 1][posInGrid.x] == 3) {
            console.log("LOOSE");
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
        getTopPos: function () {
			return `${this.topPos}px`;
		},
		getLeftPos: function() {
			return `${this.leftPos}px`;
		},
    },
    methods: {
        getRandomIntInclusive: function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        moveGhost: function() {
            const ghost = this.$refs.ghost.getBoundingClientRect();
            const centerX = (ghost.left + ghost.right) / 2;
            const centerY = (ghost.top + ghost.bottom) / 2;
            const posInGrid = {
                x: Math.floor(centerX / 40),
                y: Math.floor(centerY / 40),
            };
            let possibleMoves = [];
            if (this.dir == 0 || this.dir == 1) {
                if (this.$store.state.grid[posInGrid.y][posInGrid.x + 1] != 0 || this.$store.state.grid[posInGrid.y][posInGrid.x - 1] != 0) {
                    if (this.$store.state.grid[posInGrid.y][posInGrid.x + 1] != 0) {
                        possibleMoves.push(2);
                    }
                    if (this.$store.state.grid[posInGrid.y][posInGrid.x - 1] != 0) {
                        possibleMoves.push(3);
                    }
                    if (this.dir != 1 && this.$store.state.grid[posInGrid.y + 1][posInGrid.x] != 0) {
                        possibleMoves.push(0);
                    }
                    if (this.dir != 0 && this.$store.state.grid[posInGrid.y - 1][posInGrid.x] != 0) {
                        possibleMoves.push(1);
                    }
                    this.dir = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                }
                else if (this.dir == 1 && this.$store.state.grid[posInGrid.y - 1][posInGrid.x] == 0) {
                    this.dir = 0;
                } else if (this.dir == 0 && this.$store.state.grid[posInGrid.y + 1][posInGrid.x] == 0) {
                    this.dir = 1;
                }
            } else if (this.dir == 2 || this.dir == 3) {
                if (this.$store.state.grid[posInGrid.y + 1][posInGrid.x] != 0 || this.$store.state.grid[posInGrid.y - 1][posInGrid.x] != 0) {
                    if (this.dir != 3 && this.$store.state.grid[posInGrid.y][posInGrid.x + 1] != 0) {
                        possibleMoves.push(2);
                    }
                    if (this.dir != 2 && this.$store.state.grid[posInGrid.y][posInGrid.x - 1] != 0) {
                        possibleMoves.push(3);
                    }
                    if (this.$store.state.grid[posInGrid.y + 1][posInGrid.x] != 0) {
                        possibleMoves.push(0);
                    }
                    if (this.$store.state.grid[posInGrid.y - 1][posInGrid.x] != 0) {
                        possibleMoves.push(1);
                    }
                    this.dir = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                } else if (this.dir == 2 && this.$store.state.grid[posInGrid.y][posInGrid.x + 1] == 0) {
                    this.dir = 3;
                } else if (this.dir == 3 && this.$store.state.grid[posInGrid.y][posInGrid.x - 1] == 0) {
                    this.dir = 2;
                }
            }
            if (this.dir == 0) {
                this.topPos += 40;
            } else if (this.dir == 1) {
                this.topPos -= 40;
            } else if (this.dir == 2) {
                this.leftPos += 40;
            } else if (this.dir == 3) {
                this.leftPos -= 40;
            }
            if (this.leftPos < 0) {
                this.leftPos = this.$store.state.grid.length * 40  - 110;
            } else if (this.leftPos > this.$store.state.grid.length * 40 - 110) {
                this.leftPos = 10;
            }
            if (this.$store.state.grid[posInGrid.y][posInGrid.x] == 3 || this.$store.state.grid[posInGrid.y][posInGrid.x + 1] == 3
            || this.$store.state.grid[posInGrid.y][posInGrid.x - 1] == 3 || this.$store.state.grid[posInGrid.y + 1][posInGrid.x] == 3
            || this.$store.state.grid[posInGrid.y - 1][posInGrid.x] == 3) {
                console.log("LOOSE");
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