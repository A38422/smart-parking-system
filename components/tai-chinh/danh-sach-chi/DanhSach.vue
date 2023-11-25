<template>
    <div class="list-chi">
        <Tabs :value="tabSelected" :animated="false" @on-click="handleClickTab">
            <TabPane label="Chi" name="chi"></TabPane>
            <TabPane label="Loại chi" name="loai-chi"></TabPane>
        </Tabs>
        <div class="header-table">
            <div :style="{ display: 'flex', gap: '10px' }">
                <div>
                    <span class="mr-5">Tìm kiếm</span>
                    <Input
                        v-model="searchValue"
                        search
                        clearable
                        placeholder="Nhập nội dung tìm kiếm"
                        class="input-search"
                        @on-clear="handleSearch"
                        @on-search="handleSearch"
                    />
                </div>
                <div>
                    <span>Thời gian</span>
                    <DatePicker
                        :value="timeRange"
                        format="dd/MM/yyyy"
                        type="daterange"
                        placement="bottom-end"
                        placeholder="Bắt đầu - Kết thúc"
                        :style="{ width: '200px' }"
                        @on-change="handleChangeTime"
                    ></DatePicker>
                </div>
            </div>
            <Button v-if="isAdmin" type="success" @click="openModal(false)">
                <Icon type="md-add" size="18"/>
                Thêm mới
            </Button>
        </div>

        <div class="flex-1">
            <Table
                size="large"
                max-height="600"
                :columns="columns"
                :data="data"
                :loading="loading"
            >
                <template slot="category" slot-scope="{ row }">
                    <span>{{ row.category ? row.category.name : '-' }}</span>
                </template>
                <template slot="amount" slot-scope="{ row }">
                    <span>{{ parseAmount(row.amount) }}</span>
                </template>
                <template slot="date" slot-scope="{ row }">
                    <span>{{ format(row.date) }}</span>
                </template>
                <template slot="action" slot-scope="{ row }">
                    <Icon
                        v-if="isAdmin"
                        type="md-create"
                        size="20"
                        color="#2d8cf0"
                        class="mr-5 cursor"
                        @click="edit(row)"
                    />
                    <Icon
                        v-if="isAdmin"
                        type="md-trash"
                        size="20"
                        color="#ed4014"
                        class="cursor"
                        @click="remove(row)"
                    />
                </template>
            </Table>
        </div>

        <div class="custom-navigate">
            <span class="mr-10">Tổng: {{ total }}</span>
            <Page
                :current="+query.page"
                :page-size="query.pageSize"
                :total="total"
                @on-change="handleChangePage"
            />
        </div>

        <CreateOrUpdateModal
            ref="refCreateOrUpdateModal"
            :data-loai-chi="dataLoaiChi"
            :data-edit="dataSelected"
            :is-update="isUpdate"
            @on-ok="handleSuccess"
        />

        <ConfirmModal
            ref="refConfirmModal"
            title="Xác nhận xoá"
            text="Hành động này sẽ xóa khoản chi này. Bạn đồng ý thực hiện?"
            @on-ok="deleteChi"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertDateFormat, formatDate } from '~/utils/dateFormatter'
import CreateOrUpdateModal from '~/components/tai-chinh/danh-sach-chi/CreateOrUpdateModal.vue'
import ConfirmModal from '~/components/base/ConfirmModal'

export default {

    components: {
        CreateOrUpdateModal,
        ConfirmModal,
    },

    data() {
        return {
            columns: [
                {
                    title: 'STT',
                    key: 'stt',
                    width: '70px',
                },
                {
                    title: 'Loại chi',
                    slot: 'category',
                },
                {
                    title: 'Số tiền (VNĐ)',
                    slot: 'amount',
                },
                {
                    title: 'Ngày chi',
                    slot: 'date',
                },
                {
                    title: 'Hành động',
                    slot: 'action',
                    width: 150,
                    align: 'center',
                },
            ],
            isUpdate: false,
            loading: false,
            data: [],
            dataLoaiChi: [],
            dataSelected: {},
            query: {
                page: 1,
                pageSize: 10,
            },
            total: 0,
            searchValue: '',
            timeRange: [],
            idDelete: null,
            tabSelected: 'chi',
        }
    },

    computed: {
        ...mapGetters(['user']),

        isAdmin() {
            return !!(this.user && this.user.is_admin)
        },
    },

    watch: {
        $route: {
            immediate: true,
            deep: true,
            handler() {
                this.getData()
            },
        },
    },

    created() {
        this.getLoaiChi()

        if (this.$route.query && this.$route.query.search)
            this.searchValue = this.$route.query.search
        if (this.$route.query && this.$route.query.page)
            this.query.page = this.$route.query.page
        if (
            this.$route.query &&
            this.$route.query.date_before &&
            this.$route.query.date_after
        ) {
            this.timeRange = [
                formatDate(this.$route.query.date_before),
                formatDate(this.$route.query.date_after),
            ]
        }
    },

    methods: {
        async getLoaiChi() {
            try {
                this.loading = true
                const res = await this.$axios.$get(this.$api.EXPENSE_CATEGORIES, {
                    params: {
                        query_all: true,
                    },
                })
                this.dataLoaiChi = res
            } catch (e) {
                console.log('error: ', e)
            }
        },

        async getData() {
            try {
                const query = {
                    ...this.query,
                    ...this.$route.query,
                }
                this.loading = true
                const res = await this.$axios.$get(this.$api.EXPENSES, {
                    params: {
                        ...query,
                        ordering: '-id',
                    },
                })
                this.data = res.results.map((item, index) => {
                    return {
                        ...item,
                        stt: index + 1 + 10 * (this.query.page - 1),
                    }
                })
                this.total = res.count
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

        handleSearch() {
            const query = {
                ...this.$route.query,
                search: this.searchValue,
            }

            this.query.page = 1
            if (query.page) delete query.page
            if (query.search === '') delete query.search

            this.$router.push({
                query: {
                    ...query,
                },
            })
        },

        handleChangeTime(value) {
            const query = {
                ...this.$route.query,
                date_before: convertDateFormat(value[0]),
                date_after: convertDateFormat(value[1]),
            }

            this.query.page = 1
            if (query.page) delete query.page
            if (query.date_before === '') delete query.date_before
            if (query.date_after === '') delete query.date_after

            this.$router.push({
                query: {
                    ...query,
                },
            })
        },

        edit(row) {
            this.dataSelected = row
            this.openModal(true)
        },

        remove(row) {
            this.idDelete = row.id
            this.$refs.refConfirmModal.open()
        },

        openModal(update) {
            this.isUpdate = update

            this.$refs.refCreateOrUpdateModal.open()
            this.$refs.refCreateOrUpdateModal.setFormState({ ...this.dataSelected })

            this.dataSelected = {}
        },

        handleSuccess() {
            this.getData()
        },

        async deleteChi() {
            try {
                this.loading = true
                await this.$axios.$delete(`${this.$api.EXPENSES}${this.idDelete}/`)
                this.$Message.success({
                    content: 'Xóa thành công',
                    closable: true,
                })
                this.handleSuccess()
            } catch (e) {
                console.log('error', e)
                this.loading = false
                if (e && e.response && e.response.status === 403) {
                    this.$Message.error({
                        content: 'Không được phép thực hiện hành động này',
                        closable: true,
                    })
                } else {
                    this.$Message.error({
                        content: 'Xóa thất bại',
                        closable: true,
                    })
                }
            }
        },

        parseAmount(value) {
            return `${Number(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },

        format(value) {
            return formatDate(value)
        },

        handleClickTab(value) {
            if (value === 'chi') this.$router.push('/tai-chinh/chi')
            else if (value === 'loai-chi') this.$router.push('/tai-chinh/loai-chi')
        },
    },
}
</script>
<style lang="less">
.list-chi {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .custom-navigate {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;
    }
}

.ml-10 {
    margin-left: 10px;
}

.mr-5 {
    margin-right: 5px;
}

.cursor {
    cursor: pointer;
}

.header-table {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    margin-bottom: 20px;
}
</style>
