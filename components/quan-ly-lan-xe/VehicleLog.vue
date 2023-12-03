<script>
import { defineComponent } from 'vue'

export default defineComponent({
        name: 'VehicleLog',

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
                    title: 'Tên làn',
                    key: 'name',
                    sortable: true
                },
                {
                    title: 'Loại',
                    key: 'type',
                    filters: [
                        {
                            label: 'Làn ra',
                            value: 1
                        },
                        {
                            label: 'Làn vào',
                            value: 2
                        }
                    ],
                },
                {
                    title: 'Khu vực',
                    key: 'status',
                },
                {
                    title: 'Trạng thái',
                    key: 'number',
                    filters: [
                        {
                            label: 'Kích hoạt',
                            value: 1
                        },
                        {
                            label: 'Không kích hoạt',
                            value: 2
                        }
                    ],
                },
                {
                    title: 'Ngày tạo',
                    key: 'time_in',
                    sortable: true
                },
            ],
        }
    },

    created() {
        this.getData()
    },

    methods: {
        async getData() {
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

        async onHandleAdd() {
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
})
</script>

<template>
    <div class="flex-column">
        <BaseFixedPageHeader>
            <p slot="title" class="fs-lg semi-bold">
                Quản lý làn xe
            </p>
            <div slot="extend">
                <BaseSearchByRouter/>
                <Button  type="primary" @click="onHandleAdd">
                    <Icon type="md-add" size="18"/>
                    Add
                </Button>
            </div>
        </BaseFixedPageHeader>

        <BaseLayoutContainer class="mt-sm flex-1">
            <BaseTableData :loading="loading"
                           :data-table="dataTable"
                           :columns="columns"/>
        </BaseLayoutContainer>
    </div>
</template>

<style scoped lang="less">

</style>
