<script>
import { defineComponent } from 'vue'
import ModalCreateScreen from '~/components/ticket-screen/ModalCreateScreen.vue';

export default defineComponent({
    name: 'CreateScreen',

    components: {
        ModalCreateScreen
    },

    methods: {
        openModalCreate() {
            this.$refs.refModalCreateScreen.open()
        },
    }
})
</script>

<template>
    <div class="flex-row items-center">
        <Icon type="ios-create" :size="36" class="ml-xs text-secondary cursor" @click="openModalCreate"/>
        <ModalCreateScreen ref="refModalCreateScreen"/>
    </div>
</template>

<style scoped lang="less">

</style>
