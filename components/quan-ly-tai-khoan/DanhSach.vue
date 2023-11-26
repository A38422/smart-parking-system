<template>
    <div>
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
                <template slot="date_joined" slot-scope="{ row }">
                    <span>{{ format(row) }}</span>
                </template>
                <template slot="role" slot-scope="{ row }">
                    <span>{{ role(row) }}</span>
                </template>
                <template slot="status" slot-scope="{ row }">
                    <!--          <span>{{ row.is_active ? 'Hoạt động' : 'Chặn' }}</span>-->
                    <iSwitch
                        v-model="row.is_active"
                        :loading="loadingSwitch"
                        true-color="#13ce66"
                        false-color="#ff4949"
                        :before-change="handleBeforeChange"
                        @on-change="handleChangeSwitch(row)"
                    >
                    </iSwitch>
                </template>
                <template slot="action" slot-scope="{ row }">
                    <Dropdown
                        v-if="isAdmin"
                        @on-click="handleClickDrp($event, row)"
                    >
                        <Icon type="md-more" class="cursor"></Icon>
                        <DropdownMenu slot="list">
                            <DropdownItem name="pw">Đổi mật khẩu</DropdownItem>
                            <DropdownItem name="role"
                            >Thay đổi vai trò
                            </DropdownItem
                            >
                            <DropdownItem name="delete">Xóa</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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

        <ChangePasswordModal
            ref="refChangePasswordModal"
            @on-ok="handleSuccess"
        />

        <CreateOrUpdateModal
            ref="refCreateOrUpdateModal"
            :family-tree="familyTree"
            :data-edit="dataSelected"
            :is-update="isUpdate"
            @on-ok="handleSuccess"
        />

        <ConfirmModal
            ref="refConfirmModal"
            title="Xác nhận xoá"
            text="Hành động này sẽ xóa loại tài khoản này. Bạn đồng ý thực hiện?"
            @on-ok="deleteUser"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertDateTimeToDatePicker, formatDateLocal } from '~/utils/dateFormatter'
import CreateOrUpdateModal from '~/components/quan-ly-tai-khoan/CreateOrUpdateModal.vue'
import ConfirmModal from '~/components/base/ConfirmModal.vue'
import ChangePasswordModal from '~/components/quan-ly-tai-khoan/ChangePasswordModal.vue'

export default {
    name: 'DanhSach',

    components: {
        ChangePasswordModal,
        CreateOrUpdateModal,
        ConfirmModal,
    },

    data() {
        return {
            isUpdate: false,
            loading: false,
            data: [],
            familyTree: [],
            dataSelected: {},
            query: {
                page: 1,
                pageSize: 10,
            },
            total: 0,
            searchValue: '',
            timeRange: [],
            idDelete: null,
            tabSelected: 'loai-chi',
            loadingSwitch: false,
        }
    },

    computed: {
        ...mapGetters(['user']),

        isAdmin() {
            return !!(this.user && this.user.is_admin)
        },

        listRole() {
            return [
                {
                    value: true,
                    label: 'Hội đồng gia tộc',
                },
                {
                    value: false,
                    label: 'Thành viên',
                },
            ]
        },

        listStatus() {
            return [
                {
                    value: false,
                    label: 'Chặn',
                },
                {
                    value: true,
                    label: 'Hoạt động',
                },
            ]
        },

        columns() {
            return [
                {
                    title: 'STT',
                    key: 'stt',
                    width: 70,
                },
                {
                    title: 'Tên tài khoản',
                    key: 'username',
                },
                {
                    title: 'Vai trò',
                    slot: 'role',
                    filters: this.listRole,
                    filterMultiple: false,
                    filterRemote: (value) =>
                        this.handleFilter('is_superuser', value),
                },
                {
                    title: 'Trạng thái',
                    slot: 'status',
                    // width: 150,
                    filters: this.listStatus,
                    filterMultiple: false,
                    filterRemote: (value) =>
                        this.handleFilter('is_active', value),
                },
                {
                    title: 'Ngày tạo',
                    slot: 'date_joined',
                },
                {
                    title: 'Hành động',
                    slot: 'action',
                    width: 150,
                    align: 'center',
                },
            ]
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
        this.getAllData()

        if (this.$route.query && this.$route.query.search) {
            this.searchValue = this.$route.query.search
        }
        if (this.$route.query && this.$route.query.page) {
            this.query.page = this.$route.query.page
        }
        if (
            this.$route.query &&
            this.$route.query.date_joined_before &&
            this.$route.query.date_joined_after
        ) {
            this.timeRange = [
                formatDateLocal(this.$route.query.date_joined_before),
                formatDateLocal(this.$route.query.date_joined_after),
            ]
        }
    },

    methods: {
        async getAllData() {
            try {
                this.familyTree = await this.$axios.$get(
                    this.$api.FAMILY_TREE,
                    {
                        params: {
                            query_all: true,
                        },
                    },
                )
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
                const res = await this.$axios.$get(this.$api.USER, {
                    params: {
                        ...query,
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
                date_joined_before: convertDateTimeToDatePicker(value[0]),
                date_joined_after: convertDateTimeToDatePicker(value[1]),
            }

            this.query.page = 1
            if (query.page) delete query.page
            if (query.date_joined_before === '') delete query.date_joined_before
            if (query.date_joined_after === '') delete query.date_joined_after

            this.$router.push({
                query: {
                    ...query,
                },
            })
        },

        handleFilter(type, value) {
            const query = {
                ...this.$route.query,
            }

            if (type === 'is_superuser') {
                if (value.length > 0) {
                    query.is_superuser = value[0]
                } else {
                    delete query.is_superuser
                }
            }

            if (type === 'is_active') {
                if (value.length > 0) {
                    query.is_active = value[0]
                } else {
                    delete query.is_active
                }
            }

            delete query.page
            this.query.page = 1

            this.$router.push({
                query,
            })
        },

        edit(row) {
            this.dataSelected = {
                id: row.id,
                username: row.username,
                password: '',
                rePassword: '',
                role: row.is_superuser ? 'admin' : 'member',
                member: this.familyTree.find((item) => item.user === row.id)
                    ? this.familyTree.find((item) => item.user === row.id).id
                    : null,
            }
            this.openModal(true)
        },

        changePw(row) {
            this.$refs.refChangePasswordModal.open()
            this.$refs.refChangePasswordModal.setFormState({
                id: row.id,
                password: null,
                rePassword: null,
            })
        },

        remove(row) {
            this.idDelete = row.id
            this.$refs.refConfirmModal.open()
        },

        handleClickDrp(type, row) {
            if (type === 'pw') {
                this.changePw(row)
            } else if (type === 'role') {
                this.edit(row)
            } else if (type === 'delete') {
                this.remove(row)
            }
        },

        openModal(update) {
            this.isUpdate = update

            this.$refs.refCreateOrUpdateModal.open()
            this.$refs.refCreateOrUpdateModal.setFormState({
                ...this.dataSelected,
            })

            this.dataSelected = {}
        },

        handleSuccess() {
            this.getData()
            this.getAllData()
        },

        async deleteUser() {
            try {
                this.loading = true
                await this.$axios.$delete(`${this.$api.USER}${this.idDelete}/`)
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

        format(row) {
            return row && row.date_joined ? formatDateLocal(row.date_joined) : '-'
        },

        role(row) {
            return row.is_superuser ? 'Hội đồng gia tộc' : 'Thành viên'
        },

        handleBeforeChange() {
            return new Promise((resolve) => {
                this.$Modal.confirm({
                    title: 'Xác nhận',
                    content: 'Bạn có chắc muốn thực hiện hành động này？',
                    okText: 'Đồng ý',
                    cancelText: 'Hủy',
                    onOk: () => {
                        resolve()
                    },
                })
            })
        },

        async handleChangeSwitch(row) {
            try {
                // this.loadingSwitch = true
                await this.$axios.$patch(`${this.$api.USER}${row.id}/`, {
                    is_active: row.is_active,
                })
                this.$Message.success({
                    content: 'Cập nhật thành công',
                    closable: true,
                })
                // this.loadingSwitch = false
            } catch (e) {
                // this.loadingSwitch = false
                console.log('error', e)
                row.is_active = !row.is_active
                if (e && e.response && e.response.status === 403) {
                    this.$Message.error({
                        content: 'Không được phép thực hiện hành động này',
                        closable: true,
                    })
                } else {
                    this.$Message.error({
                        content: 'Cập nhật thất bại',
                        closable: true,
                    })
                }
            }
        },
    },
}
</script>
<style lang="less">

</style>
