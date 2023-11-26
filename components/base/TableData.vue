<script>
    export default {
        props: {
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            dataTable: {
                type: Array,
                default() {
                    return []
                }
            },
            loading: {
                type: Boolean,
                default() {
                    return false
                }
            },
        },

        data() {
            return {
                total: 0,
                query: {
                    page: 1,
                    pageSize: 10,
                },
            }
        },

        created() {
            if (this.$route.query && this.$route.query.page) this.query.page = this.$route.query.page
            else this.query.page = 1
        },

        methods: {
            handleChangePage(page) {
                this.query.page = page

                const query = {
                    ...this.$route.query,
                    page,
                }

                this.$router.push({
                    query: {
                        ...query,
                    },
                })
            },
        }
    }
</script>

<template>
    <div class="h-100 w-100 flex-column">
        <div class="flex-1">
            <Table
                max-height="730"
                :columns="columns"
                :data="dataTable"
                :loading="loading"
            />
        </div>

        <div class="custom-navigate">
            <span class="mr-sm">Bản ghi: {{ total }}</span>
            <Page
                :current="+query.page"
                :page-size="query.pageSize"
                :total="total"
                @on-change="handleChangePage"
            />
        </div>
    </div>
</template>

<style scoped lang="less">

</style>
