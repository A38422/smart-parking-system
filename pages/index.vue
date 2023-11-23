<template>
    <div class="container">
        <Spin v-if="loading" size="large" fix></Spin>
        <div
            v-else-if="dataTable && dataTable.length > 0"
            :style="{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }"
        ></div>
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

    head() {
        return {}
    },

    computed: {},

    created() {
        this.getAllData()

        this.$Notice.open({
            title: 'Notification title',
            desc: 'Here is the notification description. Here is the notification description. ',
            duration: 0
        });

        this.$Notice.success({
            title: 'Success title',
            desc: 'Here is the notification description. Here is the notification description. ',
            duration: 0
        });

        this.$Notice.warning({
            title: 'Warning title',
            desc: 'Here is the notification description. Here is the notification description. ',
            duration: 0
        });

        this.$Notice.error({
            title: 'Error title',
            desc: 'Here is the notification description. Here is the notification description. ',
            duration: 0
        });
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

.semi-bold {
    font-weight: 600;
}

.text-black {
    color: black;
}
</style>
