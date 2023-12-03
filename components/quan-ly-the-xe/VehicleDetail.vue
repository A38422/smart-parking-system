<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VehicleDetail',

    data() {
        return {
            dropdownDownMenu: [
                { name: 'lost_ticket', label: 'Hủy kích hoạt' },
                { name: 'check_out', label: 'Xóa' },
                { name: 'check_out', label: 'Chỉnh sửa' },
            ]
        }
    }
})
</script>

<template>
    <BaseLayoutDetail :dropdown-down-menu="dropdownDownMenu">
        <Row slot="info-left">
            <BaseInformationItem span="13" label="Thẻ xe" content="19799891"/>
            <BaseInformationItem span="13" label="Loại thẻ" content="Vật lý"/>
            <BaseInformationItem span="13" label="Loại xe" content="xe máy"/>
            <BaseInformationItem span="13" label="Vé xe" content="Xe máy - vé tháng"/>
            <BaseInformationItem span="13" label="Loại vé" content="Vé tháng"/>
            <BaseInformationItem span="13" label="Chủ xe" content="Nguyễn An Nguyên"/>
            <BaseInformationItem span="13" label="TG hết hạn" content="22/02/2023"/>
            <BaseInformationItem span="13" label="Biển số DK" content="36B149453"/>
            <BaseInformationItem span="13" label="SDT chủ" content="097176199"/>
            <BaseInformationItem span="13" label="Mã truy cập" content="10022"/>
            <BaseInformationItem span="13" label="Thông tin xe" content="SH màu xanh"/>
            <BaseInformationItem span="13" label="Trạng thái" content="Mất"/>
            <BaseInformationItem span="13" label="Lý do" content="Khách hàng làm mất"/>
        </Row>
        <div slot="info-content"/>
    </BaseLayoutDetail>
</template>

<style scoped lang="less">

</style>
