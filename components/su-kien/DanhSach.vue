<template>
    <div class="list-event">
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
                <Icon type="md-add" size="18" />
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
                <template slot="date" slot-scope="{ row }">
                    <span>{{ format(row) }}</span>
                </template>
                <template slot="attendees" slot-scope="{ row }">
                    <span
                        class="text-primary cursor"
                        @click="handleShowAttendees(row)"
                        >{{ Attendees(row) }}</span
                    >
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

        <DetailAttendeesModal
            ref="refDetailAttendeesModal"
            :family-tree="familyTree"
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
            text="Hành động này sẽ xóa sự kiện này. Bạn đồng ý thực hiện?"
            @on-ok="deleteEvent"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertDateFormat, formatDate } from '~/utils/dateFormatter'
import CreateOrUpdateModal from '~/components/su-kien/CreateOrUpdateModal.vue'
import ConfirmModal from '~/components/base/ConfirmModal.vue'
import DetailAttendeesModal from '~/components/su-kien/DetailAttendeesModal.vue'

export default {
    name: 'DanhSach',

    components: {
        CreateOrUpdateModal,
        ConfirmModal,
        DetailAttendeesModal,
    },

    data() {
        return {
            columns: [
                {
                    title: 'STT',
                    key: 'stt',
                    width: 70,
                },
                {
                    title: 'Tên sự kiện',
                    key: 'name',
                },
                {
                    title: 'Địa điểm',
                    key: 'location',
                },
                {
                    title: 'Ngày diễn ra',
                    slot: 'date',
                    width: 140,
                },
                {
                    title: 'Mô tả',
                    key: 'description',
                },
                {
                    title: 'Số lượng tham gia',
                    slot: 'attendees',
                    width: 180,
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
            events: [],
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
        this.getAllData()

        if (this.$route.query && this.$route.query.search) {
            this.searchValue = this.$route.query.search
        }
        if (this.$route.query && this.$route.query.page) {
            this.query.page = this.$route.query.page
        }
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
                this.events = await this.$axios.$get(this.$api.EVENT, {
                    params: {
                        query_all: true,
                    },
                })
                this.events = this.events.map((item) => {
                    return {
                        title: item.name,
                        start: item.date,
                    }
                })
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
                const res = await this.$axios.$get(this.$api.EVENT, {
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
            this.$refs.refCreateOrUpdateModal.setFormState({
                ...this.dataSelected,
            })

            this.dataSelected = {}
        },

        handleSuccess() {
            this.getData()
            this.getAllData()
        },

        async deleteEvent() {
            try {
                this.loading = true
                await this.$axios.$delete(`${this.$api.EVENT}${this.idDelete}/`)
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
            return row && row.date ? formatDate(row.date) : '-'
        },

        Attendees(row) {
            return row && row.attendees && row.attendees.length > 0
                ? row.attendees.length
                : 0
        },

        handleShowAttendees(row) {
            this.$refs.refDetailAttendeesModal.open()
            this.$refs.refDetailAttendeesModal.setData(row.attendees)
        },
    },
}
</script>
<style lang="less">
.list-event {
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

.flex-1 {
    flex: 1;
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

.text-primary {
    color: #0052cc;
    fill: #0052cc;
}
</style>
