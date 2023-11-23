<template>
    <div class="login-wrapper">
        <Nuxt />

        <BaseParticles />
    </div>
</template>
<script>
import BaseParticles from '~/components/base/BaseParticles.vue'

export default {
    components: {
        BaseParticles,
    },
}
</script>
<style lang="less">
.login-wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //background: #f5f7f9;
    background: #41576d;
}
</style>
