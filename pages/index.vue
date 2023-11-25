<template>
    <div>
        <BaseFixedPageHeader>
            <p slot="title" class="fs-lg semi-bold">Nhật ký xe ra vào</p>
            <div slot="extend">
                <BaseSearchByRouter/>
                <BaseDatePickerByRouter/>
            </div>
        </BaseFixedPageHeader>

        <BaseLayoutContainer class="mt-sm">
            <div class="h-100 w-100 flex-column">
                <div class="flex-1">
                    <Table
                        size="large"
                        max-height="730"
                        :columns="columns"
                        :data="dataTable"
                        :loading="loading"
                    />
                </div>

                <div class="custom-navigate">
                    <span class="mr-sm">Tổng: {{ total }}</span>
                    <Page
                        :current="+query.page"
                        :page-size="query.pageSize"
                        :total="total"
                        @on-change="handleChangePage"
                    />
                </div>
            </div>
        </BaseLayoutContainer>
    </div>
</template>

<script>
export default {
    name: 'HomePage',

    data() {
        return {
            loading: false,
            dataTable: [],
            columns: [
                {
                    title: 'STT',
                    key: 'stt',
                    width: '70px',
                },
                {
                    title: 'Vé xe',
                    key: 'name',
                },
                {
                    title: 'Loại vé',
                    key: 'type',
                    filters: [
                        {
                            label: 'Greater than 25',
                            value: 1
                        },
                        {
                            label: 'Less than 25',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.age > 25;
                        } else if (value === 2) {
                            return row.age < 25;
                        }
                    }
                },
                {
                    title: 'Trạng thái',
                    key: 'status',
                    filters: [
                        {
                            label: 'Greater than 25',
                            value: 1
                        },
                        {
                            label: 'Less than 25',
                            value: 2
                        }
                    ],
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.age > 25;
                        } else if (value === 2) {
                            return row.age < 25;
                        }
                    }
                },
                {
                    title: 'Biển số',
                    key: 'number',
                },
                {
                    title: 'TG vào',
                    key: 'time_in',
                    sortable: true
                },
                {
                    title: 'TG ra',
                    key: 'time_out',
                    sortable: true
                },
                {
                    title: 'TG cập nhật',
                    key: 'time_update',
                    sortable: true
                },
                {
                    title: 'Phí',
                    key: 'fee',
                    // align: 'center',
                },
            ],
            total: 0,
            query: {
                page: 1,
                pageSize: 10,
            },
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
    },
}
</script>
<style lang="less">

</style>
