<template>
    <div class="list-muc-thu">
        <Tabs :value="tabSelected" :animated="false" @on-click="handleClickTab">
            <TabPane label="Thu" name="thu"></TabPane>
            <TabPane label="Tài trợ" name="tai-tro"></TabPane>
            <TabPane label="Thiết lập mức thu" name="muc-thu"></TabPane>
        </Tabs>
        <div class="header-table">
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
                <template slot="amount" slot-scope="{ row }">
                    <span>{{ parseAmount(row.amount) }}</span>
                </template>
                <template slot="note" slot-scope="{ row }">
                    <span>{{ row && row.note ? row.note : '-' }}</span>
                </template>
                <template slot="action" slot-scope="{ row }">
                    <Icon
                        v-if="isAdmin && currentYear <= Number(row.year)"
                        type="md-create"
                        size="20"
                        color="#2d8cf0"
                        class="mr-5 cursor"
                        @click="edit(row)"
                    />
                    <Icon
                        v-if="isAdmin && currentYear <= Number(row.year)"
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
            :data-edit="dataSelected"
            :is-update="isUpdate"
            @on-ok="handleSuccess"
        />

        <ConfirmModal
            ref="refConfirmModal"
            title="Xác nhận xoá"
            text="Hành động này sẽ xóa mức thu này. Bạn đồng ý thực hiện?"
            @on-ok="deleteMucThu"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfirmModal from '../../base/ConfirmModal'
import CreateOrUpdateModal from './CreateOrUpdateModal'

export default {
    name: 'DanhSach',

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
                    title: 'Năm',
                    key: 'year',
                },
                {
                    title: 'Mức thu (VNĐ)',
                    key: 'amount',
                    slot: 'amount',
                },
                {
                    title: 'Ghi chú',
                    key: 'note',
                    slot: 'note',
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
            dataSelected: {},
            query: {
                page: 1,
                pageSize: 10,
            },
            total: 0,
            searchValue: '',
            idDelete: null,
            currentYear: new Date().getFullYear(),
            tabSelected: 'muc-thu',
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
        if (this.$route.query && this.$route.query.search)
            this.searchValue = this.$route.query.search
        if (this.$route.query && this.$route.query.page)
            this.query.page = this.$route.query.page
    },

    methods: {
        async getData() {
            try {
                const query = {
                    ...this.query,
                    ...this.$route.query,
                }
                this.loading = true
                const res = await this.$axios.$get(this.$api.CONTRIBUTION, {
                    params: {
                        ...query,
                        ordering: '-year',
                    },
                })
                this.data = res.results.map((item, index) => {
                    return {
                        ...item,
                        amount: Number(item.amount),
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

        parseAmount(value) {
            return `${Number(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },

        async deleteMucThu() {
            try {
                this.loading = true
                await this.$axios.$delete(`${this.$api.CONTRIBUTION}${this.idDelete}/`)
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

        handleClickTab(value) {
            if (value === 'thu') this.$router.push('/tai-chinh/thu')
            else if (value === 'tai-tro') this.$router.push('/tai-chinh/tai-tro')
            else if (value === 'muc-thu') this.$router.push('/tai-chinh/muc-thu')
        },
    },
}
</script>
<style lang="less">
.list-muc-thu {
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

.mr-10 {
    margin-right: 10px;
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

    .input-search {
        /*flex: 1;*/
        /*min-width: 150px;*/
        /*max-width: 300px;*/
        width: 200px;
    }
}
</style>
