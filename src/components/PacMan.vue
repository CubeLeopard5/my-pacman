<template>
    <div>
        <img src="@/assets/images/pacman4.gif" alt="pacman" class="pacman" v-bind:style="{ 'top': getTopPos, 'left': getLeftPos, '--rotation': `${dir * 90}deg` }" ref="pacman"/>
    </div>
</template>

<script>
export default {
    name: 'PacMan',
    created() {
		window.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 's':
                    this.dir = 1;
					break;
				case 'z':
					this.dir = 3;
					break;
				case 'd':
					this.dir = 0;
					break;
				case 'q':
					this.dir = 2;
					break;
				default:
					break;
			}
            this.movePacman();
		});
        
	},
	data() {
		return {
			topPos: 50,
			leftPos: 50,
            posInGrid: {
                x: 1,
                y: 1,
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
        movePacman: function() {
            const pacman = this.$refs.pacman.getBoundingClientRect();
            const centerX = (pacman.left + pacman.right) / 2;
            const centerY = (pacman.top + pacman.bottom) / 2;
            const posInGrid = {
                x: Math.floor(centerX / 40),
                y: Math.floor(centerY / 40),
            };
            if (this.dir == 1 && this.$store.state.grid[posInGrid.y + 1][posInGrid.x] != 0) {
                this.topPos += 40;
                this.$store.state.grid[posInGrid.y + 1][posInGrid.x] = 3;
            } else if (this.dir == 3 && this.$store.state.grid[posInGrid.y - 1][posInGrid.x] != 0) {
                this.topPos -= 40;
                this.$store.state.grid[posInGrid.y - 1][posInGrid.x] = 3;
            } else if (this.dir == 0 && this.$store.state.grid[posInGrid.y][posInGrid.x + 1] != 0) {
                this.leftPos += 40;
                this.$store.state.grid[posInGrid.y][posInGrid.x + 1] = 3;
            } else if (this.dir == 2 && this.$store.state.grid[posInGrid.y][posInGrid.x - 1] != 0) {
                this.leftPos -= 40;
                this.$store.state.grid[posInGrid.y][posInGrid.x - 1] = 3;
            }
            this.$store.state.grid[posInGrid.y][posInGrid.x] = 1;
            if (this.leftPos < 0) {
                this.leftPos = this.$store.state.grid.length * 40  - 120;
            } else if (this.leftPos > this.$store.state.grid.length * 40 - 120) {
                this.leftPos = 10;
            }
        }
    }
}
</script>

<style scoped>
.pacman {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
	width: 40px;
    transform: rotate(var(--rotation));
}
</style>