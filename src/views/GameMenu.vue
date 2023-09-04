<template>
    <div class="background">
        <div class="game-menu">
            <span class="game-msg"> Select the number of ghosts (0 - 4) and launch game: </span>
            <input type="number" id="nbGhost" name="nbGhost" min="0" max="4" v-model="nbGhost" style="height: 32px;"/>
            <button @click="goTo('PacmanGame', false)" class="game-button"> Launch game with default map </button>
            <button @click="goTo('PacmanGame', true)" class="game-button"> Launch game with random map </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameMenu',
    data() {
        return {
            nbGhost: 4,
        }
    },
    methods: {
        goTo(name, random) {
            if (this.nbGhost < 0 || this.nbGhost > 4) {
                return;
            }
            this.$router.push({ name, state: { random, nbGhost: this.nbGhost } });
        },
    }
}
</script>

<style>
.background {
    background-image: url('../../public/assets/images/game_menu.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.game-menu {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.game-button {
    height: 45px;
    background: yellow;
    border-radius: 8px;
}

.game-button:hover {
    background: #FFBF00;
}

.game-msg {
    background: yellow;
    padding: 12px;
    border-radius: 8px;
}
</style>