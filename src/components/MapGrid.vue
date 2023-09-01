<template>
    <div style="display: grid; grid-template-columns: repeat(19, 1fr); width: 760px;">
        <div v-for="row, i in goodGrid" :key="i">
            <div v-for="col, j in row" :key="j" style="height: 40px;">
                <img v-if="col == 0" src="@/assets/images/murbrique.jpg" alt="wall" style="width: 40px;" ref="wall">
                <img v-else-if="col == 1" src="@/assets/images/sol.gif" alt="ground" style="width: 40px;" ref="ground">
                <img v-else-if="col == 2" src="@/assets/images/bonbon.gif" alt="gum" style="width: 40px;" ref="gum">
            </div>
        </div>
    </div>
    <img src="@/assets/images/pacman4.gif" alt="pacman" style="position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
	width: 40px;"
	v-bind:style="{ 'top': getTopPos, 'left': getLeftPos }" ref="pacman"/>
    <div style="position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;width: 2px; height: 2px; background: blue" v-bind:style="{ 'top': getTopPos, 'left': getLeftPos }"></div>
</template>

<script>
export default {
    name: 'MapGrid',
    created() {
		window.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 's':
                    this.dir = 0;
					break;
				case 'z':
					this.dir = 1;
					break;
				case 'd':
					this.dir = 2;
					break;
				case 'q':
					this.dir = 3;
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
            overflow: {
                x: 0,
                y: 0,
            }
		}
	},
    computed: {
        getTopPos: function () {
			return `${this.topPos}px`;
		},
		getLeftPos: function() {
			return `${this.leftPos}px`;
		},
        goodGrid: function() {
            const numRows = this.$store.state.grid.length;
            const numCols = this.$store.state.grid[0].length;
            const transposedGrid = [];
            for (let col = 0; col < numCols; col++) {
                const newRow = [];
                for (let row = 0; row < numRows; row++) {
                    newRow.push(this.$store.state.grid[row][col]);
                }
                transposedGrid.push(newRow);
            }
            return transposedGrid;
        }
    },
    methods: {
        movePacman: function() {
            const pacman = this.$refs.pacman.getBoundingClientRect();
            const centerX = (pacman.left + pacman.right) / 2;
            const centerY = (pacman.top + pacman.bottom) / 2;
            console.log(centerX, centerY);
            const posInGrid = {
                x: Math.floor(centerX / 40),
                y: Math.floor(centerY / 40),
            };
            console.log(pacman, posInGrid);

            
            if (this.dir == 0 && this.$store.state.grid[posInGrid.y + 1][posInGrid.x] == 0) {
                if (this.overflow.x <= 20) {
                    this.topPos += 5;
                    this.overflow.x += 5;
                }
            } else if (this.dir == 0) {
                this.topPos += 5;
            } else if (this.dir == 1 && !this.$store.state.grid[posInGrid.y - 1][posInGrid.x] == 0) {
                this.topPos -= 5;
            } else if (this.dir == 2 && this.$store.state.grid[posInGrid.y][posInGrid.x + 1] == 0) {
                if (this.overflow.y <= 20) {
                    this.leftPos += 5;
                    this.overflow.y += 5;
                }
            } else if (this.dir == 2) {
                this.leftPos += 5;
            } else if (this.dir == 3 && !this.$store.state.grid[posInGrid.y][posInGrid.x - 1] == 0) {
                this.leftPos -= 5;
            }
        }
    }
}
</script>