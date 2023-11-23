<template>
    <Modal v-model="isOpen" :title="title">
        <slot v-if="isSlot('text')" name="text"></slot>
        <div v-else>
            <p v-if="text !== ''">
                {{ text }}
            </p>
        </div>

        <div
            slot="footer"
            class="flex-row center"
            :style="{ 'justify-content': 'flex-end' }"
        >
            <Button size="large" @click="cancel"> Đóng</Button>
            <Button :type="colorButtonSubmit" size="large" @click="ok">
                Đồng ý
            </Button>
        </div>
    </Modal>
</template>

<script>
export default {
    name: 'ConfirmModal',

    props: {
        title: {
            type: String,
            default() {
                return 'Xác nhận hành động.'
            },
        },
        text: {
            type: String,
            default() {
                return 'Bạn có muốn tiếp tục hành động này?'
            },
        },
        colorButtonSubmit: {
            type: String,
            default() {
                return 'primary'
            },
        },
    },
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        open() {
            this.isOpen = true
        },

        isSlot(name) {
            return !!this.$slots[name]
        },

        ok() {
            this.isOpen = false
            this.$emit('on-ok')
        },
        cancel() {
            this.isOpen = false
            this.$emit('on-cancel')
        },
    },
}
</script>
