<template>
    <div class="list-bao-cao">
        <div class="header-table">
            <div
                :style="{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'space-between',
                }"
            >
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
                <div>
                    <span>Loại báo cáo</span>
                    <Select
                        v-model="reportType"
                        placeholder="Chọn loại báo cáo"
                        :style="{ width: '200px' }"
                        @on-change="handleChangeType"
                    >
                        <Option
                            v-for="(item, index) in listReport"
                            :key="index"
                            :value="item.value"
                            :label="item.label"
                        >
                        </Option>
                    </Select>
                </div>
            </div>
        </div>

        <div class="flex-1">
            <Table
                id="report-table"
                ref="table"
                size="large"
                max-height="650"
                :columns="columns"
                :data="data"
                :loading="loading"
            >
                <template slot="amount" slot-scope="{ row }">
                    <span>{{ parseAmount(row) }}</span>
                </template>
                <template slot="note" slot-scope="{ row }">
                    <span>{{ row && row.note ? row.note : '-' }}</span>
                </template>
                <template slot="date" slot-scope="{ row }">
                    <span>{{ format(row) }}</span>
                </template>
                <template slot="action" slot-scope="{ row }">
                    <NuxtLink :to="handleViewDetail(row)" target="_blank"
                    >Chi tiết
                    </NuxtLink>
                </template>
            </Table>
        </div>

        <div class="custom-navigate">
            <span
                class="mr-10 fs-16"
                :class="
                    totalAmount > 0
                        ? 'text-success'
                        : totalAmount === 0
                          ? ''
                          : 'text-danger'
                "
            >
                Tổng số tiền:
                {{
                    totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }}
            </span>
            <Button
                type="primary"
                :loading="loadingExport"
                @click="handleExport"
            >
                <Icon type="md-document"/>
                Xuất PDF
            </Button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import html2pdf from 'html2pdf.js'
import { formatDateLocal, convertDateTimeToDatePicker } from '~/utils/dateFormatter'

export default {
    name: 'DanhSach',

    components: {},

    data() {
        return {
            columns: [
                {
                    title: 'STT',
                    key: 'stt',
                    width: '100px',
                },
                {
                    title: 'Tên khoản',
                    key: 'name',
                },
                {
                    title: 'Số tiền (VNĐ)',
                    slot: 'amount',
                },
                {
                    title: 'Ngày',
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
            loadingExport: false,
            data: [],
            dataSelected: {},
            searchValue: '',
            idDelete: null,
            timeRange: [],
            reportType: 'thu-chi',
            totalAmount: 0,
        }
    },

    computed: {
        ...mapGetters(['user']),

        isAdmin() {
            return !!(this.user && this.user.is_admin)
        },

        listReport() {
            return [
                {
                    value: 'thu',
                    label: 'Thu',
                },
                {
                    value: 'chi',
                    label: 'Chi',
                },
                {
                    value: 'thu-chi',
                    label: 'Thu chi',
                },
            ]
        },
    },

    watch: {
        $route: {
            immediate: true,
            deep: true,
            handler() {
                if (
                    this.$route.query &&
                    this.$route.query.date_before &&
                    this.$route.query.date_after
                ) {
                    this.timeRange = [
                        formatDateLocal(this.$route.query.date_before),
                        formatDateLocal(this.$route.query.date_after),
                    ]
                } else {
                    this.timeRange = []
                }

                this.getData()
            },
        },
    },

    created() {
        if (
            this.$route.query &&
            this.$route.query.date_before &&
            this.$route.query.date_after
        ) {
            this.timeRange = [
                formatDateLocal(this.$route.query.date_before),
                formatDateLocal(this.$route.query.date_after),
            ]
        } else {
            const query = {
                ...this.$route.query,
                date_before: `${new Date().getFullYear()}-01-01`,
                date_after: `${new Date().getFullYear()}-${
                    new Date().getMonth() + 1
                }-${new Date().getDate()}`,
            }

            this.$router.push({
                query: {
                    ...query,
                },
            })
        }
        if (this.$route.query && this.$route.query.type) {
            this.reportType = this.$route.query.type
        }
        if (this.$route.query && this.$route.query.search) {
            this.searchValue = this.$route.query.search
        }
    },

    methods: {
        async getData() {
            try {
                const query = {
                    type: this.reportType,
                    ...this.$route.query,
                }
                this.loading = true
                const res = await this.$axios.$get(this.$api.REPORT_IE, {
                    params: {
                        ...query,
                    },
                })

                this.totalAmount = res.total_amount
                this.data = [
                    ...res.incomes.map((item) => {
                        return {
                            ...item,
                            amount:
                                item &&
                                item.contributor &&
                                item.contributor.amount,
                            name: 'Thu định kỳ',
                        }
                    }),
                    ...res.sponsors.map((item) => {
                        return {
                            ...item,
                            sponsor: item.name,
                            name: 'Tài trợ',
                        }
                    }),
                    ...res.expenses.map((item) => {
                        return {
                            ...item,
                            name: 'Chi',
                        }
                    }),
                ]

                // this.data = [...this.data, ...this.data, ...this.data]

                this.data = this.data.map((item, index) => {
                    return {
                        ...item,
                        amount: Number(item.amount),
                        stt: index + 1,
                    }
                })

                this.total = this.data.length
                this.loading = false
            } catch (e) {
                console.log('error: ', e)
                this.loading = false
            }
        },

        handleChangePage(page) {
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
                date_before: convertDateTimeToDatePicker(value[0]),
                date_after: convertDateTimeToDatePicker(value[1]),
            }

            if (query.date_before === '') delete query.date_before
            if (query.date_after === '') delete query.date_after

            this.$router.push({
                query: {
                    ...query,
                },
            })
        },

        handleChangeType(value) {
            const query = {
                ...this.$route.query,
                type: value,
            }

            if (query.type === '') delete query.type

            this.$router.push({
                query: {
                    ...query,
                },
            })
        },

        parseAmount(row) {
            return `${row.category ? '-' : '+'}${Number(row.amount)}`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
            )
        },

        format(row) {
            return formatDateLocal(row.date || row.start_date)
        },

        handleExport() {
            this.loadingExport = true

            const title =
                this.timeRange && this.timeRange.length > 0
                    ? `Báo cáo ${
                        this.reportType === 'thu-chi'
                            ? 'thu chi'
                            : this.reportType
                    } ${this.timeRange[0]} - ${this.timeRange[1]}`
                    : `Báo cáo ${
                        this.reportType === 'thu-chi'
                            ? 'thu chi'
                            : this.reportType
                    }`
            const tables = document
                .getElementById('report-table')
                .getElementsByTagName('table')

            const header = tables[0].cloneNode(true)
            const body = tables[1].cloneNode(true)

            header.removeChild(header.getElementsByTagName('colgroup')[0])
            header
                .getElementsByTagName('tr')[0]
                .removeChild(
                    header.getElementsByTagName('th')[
                    header.getElementsByTagName('th').length - 1
                        ],
                )
            header
                .getElementsByTagName('tr')[0]
                .removeChild(
                    header.getElementsByTagName('th')[
                    header.getElementsByTagName('th').length - 1
                        ],
                )
            body.getElementsByTagName('colgroup')[0].removeChild(
                body.getElementsByTagName('col')[
                body.getElementsByTagName('col').length - 1
                    ],
            )
            for (let i = 0; i < body.getElementsByTagName('tr').length; i++) {
                body.getElementsByTagName('tr')[i].removeChild(
                    body
                        .getElementsByTagName('tr')
                        [i].getElementsByTagName('td')[
                    body
                        .getElementsByTagName('tr')
                        [i].getElementsByTagName('td').length - 1
                        ],
                )
            }

            const table =
                '<table cellspacing="0" cellpadding="0" border="1" style="width: 100%; color: black !important;">' +
                header.innerHTML +
                body.innerHTML +
                '</table>'

            const parser = new DOMParser()
            const doc = parser.parseFromString(table, 'text/html')
            const tableDOM = doc.querySelector('table')

            html2pdf()
                .set({
                    margin: [30, 20, 30, 20],
                    filename: `${title}.pdf`,
                    // html2canvas: { width: 1200 },
                    jsPDF: {
                        format: 'a4',
                        orientation: 'p'
                    },
                })
                .from(tableDOM)
                .toPdf()
                .get('pdf')
                .then((pdf) => {
                    const totalPages = pdf.internal.getNumberOfPages()

                    for (let i = 1; i <= totalPages; i++) {
                        pdf.setPage(i)
                        pdf.setFont('Arial Unicode MS')

                        if (i === 1) {
                            pdf.setFontSize(16)

                            const pageSize = pdf.internal.pageSize
                            const pageWidth =
                                pageSize.width || pageSize.getWidth()

                            const textWidth =
                                pdf.getStringUnitWidth(title) *
                                pdf.internal.getFontSize()
                            const textX = Math.abs(pageWidth - textWidth) / 2

                            pdf.text(title, textX, 20)
                        }

                        if (i === totalPages) {
                            const totalAmount = `Tong so tien: ${this.totalAmount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

                            pdf.setFontSize(13)

                            const pageSize = pdf.internal.pageSize
                            const pageWidth =
                                pageSize.width || pageSize.getWidth()
                            const pageHeight =
                                pageSize.height || pageSize.getHeight()

                            const textWidth =
                                pdf.getStringUnitWidth(totalAmount) *
                                pdf.internal.getFontSize()
                            const textX =
                                pageWidth - Math.abs(pageWidth - textWidth)

                            pdf.text(totalAmount, textX, pageHeight - 20)
                        }
                    }

                    this.loadingExport = false
                })
                .catch(() => {
                    this.loadingExport = false
                })
                .save()
        },

        handleViewDetail(row) {
            if (row && row.member) {
                if (this.timeRange && this.timeRange.length > 0) {
                    return `/tai-chinh/thu?search=${
                        row.member.name
                    }&date_before=${convertDateTimeToDatePicker(
                        this.timeRange[0],
                    )}&date_after=${convertDateTimeToDatePicker(this.timeRange[1])}`
                } else {
                    return `/tai-chinh/thu?search=${row.member.name}`
                }
            } else if (row && row.sponsor) {
                if (this.timeRange && this.timeRange.length > 0) {
                    return `/tai-chinh/tai-tro?search=${
                        row.sponsor
                    }&start_date_before=${convertDateTimeToDatePicker(
                        this.timeRange[0],
                    )}&start_date_after=${convertDateTimeToDatePicker(this.timeRange[1])}`
                } else {
                    return `/tai-chinh/tai-tro?search=${row.sponsor}`
                }
            } else if (row && row.category) {
                if (this.timeRange && this.timeRange.length > 0) {
                    return `/tai-chinh/chi?search=${
                        row.category.name
                    }&date_before=${convertDateTimeToDatePicker(
                        this.timeRange[0],
                    )}&date_after=${convertDateTimeToDatePicker(this.timeRange[1])}`
                } else {
                    return `/tai-chinh/chi?search=${row.category.name}`
                }
            }
            return '#'
        },
    },
}
</script>
<style lang="less">

</style>
