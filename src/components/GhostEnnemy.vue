<template>
    <div>
        <img src="@/assets/images/fantome_rouge1.gif" alt="ghost" class="ghost" v-bind:style="{ 'top': getTopPos, 'left': getLeftPos }" ref="ghost"/>
    </div>
</template>

<script>
export default {
    name: "GhostEnnemy",
    mounted: function () {
        this.dir = this.getRandomIntInclusive(0, 3);
        this.timer = setInterval(() => {
            this.moveGhost()
        }, 300)
    },
    beforeUnmount() {
        clearInterval(this.timer)
    },
	data() {
		return {
            timer: null,
			topPos: 130,
			leftPos: 50,
            posInGrid: {
                x: 1,
                y: 3,
            },
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

            if (this.dir == 1) {
                if (this.$store.state.grid[posInGrid.y][posInGrid.x + 1] != 0 || this.$store.state.grid[posInGrid.y][posInGrid.x - 1] != 0) {
                    this.dir = this.getRandomIntInclusive(2, 3)
                }
            }

            if (this.dir == 0 && this.$store.state.grid[posInGrid.y + 1][posInGrid.x] != 0) {
                this.topPos += 40;
                this.$store.state.grid[posInGrid.y + 1][posInGrid.x] = 4;
            } else if (this.dir == 1 && this.$store.state.grid[posInGrid.y - 1][posInGrid.x] != 0) {
                this.topPos -= 40;
                this.$store.state.grid[posInGrid.y - 1][posInGrid.x] = 4;
            } else if (this.dir == 2 && this.$store.state.grid[posInGrid.y][posInGrid.x + 1] != 0) {
                this.leftPos += 40;
                this.$store.state.grid[posInGrid.y][posInGrid.x + 1] = 4;
            } else if (this.dir == 3 && this.$store.state.grid[posInGrid.y][posInGrid.x - 1] != 0) {
                this.leftPos -= 40;
                this.$store.state.grid[posInGrid.y][posInGrid.x - 1] = 4;
            }
            this.$store.state.grid[posInGrid.y][posInGrid.x] = 1;
            if (this.leftPos < 0) {
                this.leftPos = this.$store.state.grid.length * 40  - 120;
            } else if (this.leftPos > this.$store.state.grid.length * 40 - 120) {
                this.leftPos = 10;
            }
            console.log(this.leftPos);
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