<template>
    <div class="grid">
        <div v-for="row, i in transposedGrid" :key="i">
            <div v-for="col, j in row" :key="j" :style="getHeight">
                <img :src="getImage(col)" alt="img" :style="getWidth">
            </div>
        </div>
    </div>
</template>

<script>
import constantes from '../../config';

export default {
    name: 'MapGrid',
    data() {
        const { SQUARE_SIZE, WALL, GUM } = constantes;
        return {
            SQUARE_SIZE,
            WALL,
            GUM,
            imagePaths: {
                wall: './assets/images/murbrique.jpg',
                gum: './assets/images/bonbon.gif',
                ground: './assets/images/sol.gif',
            },
        }
    },
    computed: {
        transposedGrid() {
            const { grid } = this.$store.state;
            return this.transposeGrid(grid);
        },
        getWidth() {
            return {
                width: `${this.SQUARE_SIZE}px`,
            };
        },
        getHeight() {
            return {
                height: `${this.SQUARE_SIZE}px`,
            }
        },
    },
    methods: {
        transposeGrid(grid) {
            // Because reading grid column by column won't print the map in the correct direction.
            return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
        },
        getImage(col) {
            if (col == this.WALL) {
                return this.imagePaths.wall;
            } else if (col == this.GUM) {
                return this.imagePaths.gum;
            } else {
                return this.imagePaths.ground
            }
        },
    }
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(19, 1fr);
}
</style>