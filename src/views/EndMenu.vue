<template>
    <div class="background">
        <div class="game-menu">
            <span class="game-msg"> {{ msg }} </span>
            <span class="game-msg"> Your score: {{ $store.state.gameScore }} </span>
            <button @click="goTo('GameMenu')" class="game-button"> Back to menu </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EndMenu',
    data() {
        return {
            msg: window.history.state.msg,
        }
    },
    methods: {
        goTo(name) {
            this.$store.state.gameScore = 0;
            this.$router.push({ name });
        },
    }
}
</script>