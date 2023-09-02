<template>
    <div class="grid">
        <div v-for="row, i in goodGrid" :key="i">
            <div v-for="col, j in row" :key="j" :style="{ 'height': `${square_size}px` }">
                <img :src="getImage(col)" alt="img" :style="{ 'width': `${square_size}px` }">
            </div>
        </div>
    </div>
</template>

<script>
import constantes from '../../config';

export default {
    name: 'MapGrid',
    data() {
        return {
            square_size: constantes.SQUARE_SIZE,
            wall: constantes.WALL,
            gum: constantes.GUM,
            imagePaths: {
                wall: './assets/images/murbrique.jpg',
                gum: './assets/images/bonbon.gif',
                ground: './assets/images/sol.gif',
            },
        }
    },
    computed: {
        goodGrid() {
            const grid = this.$store.state.grid;
            return this.transposeGrid(grid);
        }
    },
    methods: {
        transposeGrid(grid) {
            return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
        },
        getImage(col) {
            if (col == constantes.WALL) {
                return this.imagePaths.wall;
            } else if (col == constantes.GUM) {
                return this.imagePaths.gum;
            } else {
                return this.imagePaths.ground
            }
        }
    }
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(19, 1fr);
    width: 760px;
}
</style>