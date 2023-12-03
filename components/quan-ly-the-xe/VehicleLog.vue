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
                    title: 'Thẻ',
                    key: 'owner_mobile',
                },
                {
                    title: 'Loại vé',
                    key: 'owner_mobile',
                    filters: [
                        {
                            label: 'Vé ngày',
                            value: 1
                        },
                        {
                            label: 'Vé tháng',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.owner_mobile > 25;
                        } else if (value === 2) {
                            return row.owner_mobile < 25;
                        }
                    }
                },
                {
                    title: 'Loại xe',
                    key: 'owner_mobile',
                    filters: [
                        {
                            label: 'Xe máy',
                            value: 1
                        },
                        {
                            label: 'Xe ôtô',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.owner_mobile > 25;
                        } else if (value === 2) {
                            return row.owner_mobile < 25;
                        }
                    }
                },
                {
                    title: 'Loại vé',
                    key: 'type_car',
                },
                {
                    title: 'Biển số đăng ký',
                    key: 'number_plate',
                    sortable: true,
                },
                {
                    title: 'Chủ xe',
                    key: 'owner_name',
                    sortable: true,
                },
                {
                    title: 'Trạng thái',
                    key: 'enable',
                    // align: 'center',
                    filters: [
                        {
                            label: 'Kích hoạt',
                            value: 1
                        },
                        {
                            label: 'Hủy',
                            value: 2
                        },
                        {
                            label: 'Mất',
                            value: 3
                        }
                    ],
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.enable > 25;
                        } else if (value === 2) {
                            return row.enable < 25;
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
                const data = await this.$axios.$get(
                    this.$api.VEHICLES, {
                        params: {
                            rfid_card__isnull: true,
                        }
                    }
                )

                this.dataTable = data.results.map((item, index) => {
                    return {
                        ...item,
                        stt: index + 1
                    }
                })
                console.log('33333', this.dataTable)
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
                Quản lý thẻ xe
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
