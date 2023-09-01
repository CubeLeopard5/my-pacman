<template>
    <div style="display: grid; grid-template-columns: repeat(19, 1fr); width: 760px;">
        <div v-for="row, i in goodGrid" :key="i">
            <div v-for="col, j in row" :key="j" style="height: 40px;">
                <img v-if="col == 0" src="@/assets/images/murbrique.jpg" alt="wall" style="width: 40px;">
                <img v-else-if="col == 2" src="@/assets/images/bonbon.gif" alt="gum" style="width: 40px;">
                <img v-else src="@/assets/images/sol.gif" alt="ground" style="width: 40px;">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MapGrid',
    computed: {
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
}
</script>