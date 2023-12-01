<script>
import { defineComponent } from 'vue'
import LayoutScreen from '~/components/base/LayoutScreen.vue';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Screens',
    components: { LayoutScreen },
})
</script>

<template>
    <div class="screens overflow-auto">
        <LayoutScreen v-for="item in 4"
                      :key="item"
                      class="h-100 border-r border-b"
        />
    </div>
</template>

<style scoped lang="less">
.screens {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
}
</style>
