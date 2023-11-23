<template>
    <div id="particles"></div>
</template>

<script>
import 'particles.js'
import ParticlesConfig from '~/assets/particles.json';
export default {
    mounted() {
        this.initializeParticles()
    },
    methods: {
        initializeParticles() {
            window.particlesJS('particles', ParticlesConfig)
        },
    },
}
</script>

<style lang="less">
#particles {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
</style>
