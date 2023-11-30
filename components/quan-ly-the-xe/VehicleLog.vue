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
                    this.$api.VEHICLES, {
                        params: {
                            rfid_card__isnull: true,
                        }
                    }
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
