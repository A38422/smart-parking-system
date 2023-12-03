<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ManageUser',

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
                    title: 'Họ và tên',
                    key: 'name',
                },
                {
                    title: 'Email',
                    key: 'type',
                },
                {
                    title: 'User name',
                    key: 'status',
                    sortable: true

                },
                {
                    title: 'Admin',
                    key: 'number',
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
                    title: 'Thời điểm tạo',
                    key: 'time_in',
                },
                {
                    title: 'Đăng nhập lần cuối',
                    key: 'time_out',
                    width: '165px',
                },
                {
                    title: 'Trạng thái',
                    key: 'time_update',
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
    },
})
</script>

<template>
    <div class="flex-column">
        <BaseFixedPageHeader>
            <p slot="title" class="fs-lg semi-bold">
                Quản lý người dùng
            </p>
            <div slot="extend">
                <BaseSearchByRouter/>
                <Button type="primary">
                    <div>
                        <Icon type="md-add" />
                        Add
                    </div>
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
