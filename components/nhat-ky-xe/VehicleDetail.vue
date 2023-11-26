<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VehicleDetail',

    data() {
        return {
            dropdownDownMenu: [
                { name: 'lost_ticket', label: 'Vé xe bị mất' },
                { name: 'check_out', label: 'Xe đã ra khỏi bãi' },
            ]
        }
    }
})
</script>

<template>
    <BaseLayoutDetail :dropdown-down-menu="dropdownDownMenu">
        <Row slot="info-left">
            <BaseInformationItem span="10" label="Trạng thái" content="Đã ra"/>
            <BaseInformationItem span="10" label="Vé xe" content="RFID-19799891"/>
            <BaseInformationItem span="10" label="Mã truy cập" content="10015"/>
            <BaseInformationItem span="10" label="TG vào" content="10:45 22/02/2023"/>
            <BaseInformationItem span="10" label="Biển số DK" content="36B149453"/>
        </Row>
        <Row slot="info-right">
            <BaseInformationItem span="10" label="Ca trực" content="Nguyễn Văn A"/>
            <BaseInformationItem span="10" label="Loại vé" content="Xe máy - vé ngày"/>
            <BaseInformationItem span="10" label="Định danh" content="Thẻ xe"/>
            <BaseInformationItem span="10" label="TG ra" content="10:45 23/02/2023"/>
            <BaseInformationItem span="10" label="Phí gửi" content="3.000 VND"/>
        </Row>

        <div slot="info-content">

        </div>
    </BaseLayoutDetail>
</template>

<style scoped lang="less">

</style>
