<template>
    <div class="container">
        <Spin v-if="loading" size="large"></Spin>
        <div v-else-if="dataTable && dataTable.length > 0"
             class="h-100 w-100 flex flex-column">
        </div>
        <div v-else>Không có dữ liệu</div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',

    data() {
        return {
            loading: false,
            dataTable: [],
        }
    },

    computed: {},

    created() {
        this.getAllData()
    },

    methods: {
        async getAllData() {
            try {
                this.loading = true
                this.dataTable = await this.$axios.$get(
                    this.$api.FAMILY_TREE_STATISTICS,
                )
                this.loading = false
            } catch (e) {
                console.log('error: ', e)
                this.loading = false
            }
        },
    },
}
</script>
<style lang="less">
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.font-origin {
    font-family: 'Inter', sans-Arial, serif !important;
}
</style>
