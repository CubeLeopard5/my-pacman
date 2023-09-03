<template>
    <div class="background">
        <div style="background: white;">
            <router-link to="/game">game</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameMenu',
}
</script>

<style scoped>
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
</style>