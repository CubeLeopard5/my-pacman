export default class RandomMaze {
    randomGrid = [];
    nbRows = 0;
    nbCOlumns = 0;
    wallValue = 0;
    spaceValue = 1;
    constructor(rows, coulmns, wall, space) {
        this.nbRows = rows;
        this.nbCOlumns = coulmns;
        this.wallValue = wall;
        this.spaceValue = space;

        this.randomGrid = Array.from(Array(this.nbRows), () => Array(this.nbCOlumns).fill(this.wallValue));

        this.randomGrid[1][1] = this.spaceValue;
        for (let i = 1; i < this.randomGrid.length - 1; i++) {
            for (let j = 1; j < this.randomGrid[i].length - 1; j++) {
                this.createSpace(i, j);
            }
        }
        this.addWallsSurrounding();
        this.addTeleportingSpace();
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    createSpace(i, j) {
        if (this.randomGrid[i][j] == this.spaceValue) {
            if (this.getRandomIntInclusive(0, 1) == 0) {
                this.randomGrid[i][j + 1] = this.spaceValue;
            } else {
                this.randomGrid[i + 1][j] = this.spaceValue;
            }
        } else {
            this.randomGrid[i][j + 1] = this.spaceValue;
        }
    }
    addWallsSurrounding() {
        for (let i = 0; i < this.randomGrid.length - 1; i++) {
            this.randomGrid[i][this.randomGrid[0].length - 1] = this.wallValue;
        }
        for (let i = 0; i < this.randomGrid[0].length; i++) {
            this.randomGrid[this.randomGrid.length - 1][i] = this.wallValue;
        }
    }
    addTeleportingSpace() {
        const teleport = this.getRandomIntInclusive(1, this.randomGrid.length - 2);
        for (let i = 0; this.randomGrid[teleport][i] == this.wallValue; i++) {
            this.randomGrid[teleport][i] = 2;
        }
        for (let i = this.randomGrid[0].length - 1; this.randomGrid[teleport][i] == this.wallValue; i--) {
            this.randomGrid[teleport][i] = 2;
        }
    }
}