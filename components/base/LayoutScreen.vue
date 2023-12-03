<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutScreen'
})
</script>

<template>
    <div class="flex-column">
        <div class="flex-row items-center space-between text-white p-xs" style="background: #2d2ffd">
            <p class="fs-lg semi-bold">Làn xe 01</p>
            <div class="flex-row items-center">
                <p class="fs-lg text-error mr-lg">Làn ra</p>
                <Icon type="md-arrow-round-up" :size="24" class="text-error mr-xs"/>
                <Icon type="ios-settings" :size="24" class="text-white cursor"/>
            </div>
        </div>

        <div>
            <div class="flex-row" style="height: 140px">
                <div class="flex-column justify-center items-center border w-50">Ảnh</div>
                <div class="flex-column justify-center items-center border w-50">Ảnh</div>
            </div>
            <Row class-name="p-xs">
                <Col :span="12">
                    <BaseInformationItem span="10" label="Vé xe" content="RFID-19799891"/>
                    <BaseInformationItem span="10" label="Mã truy cập" content="10015"/>
                    <BaseInformationItem span="10" label="TG vào" content="10:45 22/02/2023"/>
                    <BaseInformationItem span="10" label="Biển số DK" content="36B149453"/>
                </Col>
                <Col :span="12">
                    <BaseInformationItem span="10" label="Loại vé" content="Xe máy - vé ngày"/>
                    <BaseInformationItem span="10" label="Định danh" content="Thẻ xe"/>
                    <BaseInformationItem span="10" label="TG ra" content="10:45 23/02/2023"/>
                    <BaseInformationItem span="10" label="Phí gửi" content="3.000 VND"/>
                </Col>
            </Row>
        </div>

        <div>
            <div class="text-white p-sxs fs-lg semi-bold align-center border border-t border-b"
                 style="background: #0dd203">
                KHỚP
            </div>
            <div class="p-xs">Thông tin hợp lệ</div>
        </div>

        <div class="flex-1 border-t mt-lg flex-column space-between">
            <div class="flex-row items-center p-xs border-b">
                <p class="text-error fs-lg w-50">BIỂN SỐ VÀO</p>
                <p class="text-error fs-lg w-50">BIỂN SỐ RA</p>
            </div>

            <div class="flex-row items-center">
                <p class="fs-lg w-50 border-r p-xs">36B149453</p>
                <p class="fs-lg w-50 p-xs">36B149453</p>
            </div>

            <div class="flex-1">
                <div class="flex-row h-50" >
                    <div class="flex-column justify-center items-center border h-100 w-50">Ảnh</div>
                    <div class="flex-column justify-center items-center border h-100 w-50">Ảnh</div>
                </div>
                <div class="flex-row h-50">
                    <div class="flex-column justify-center items-center border h-100 w-50">Ảnh</div>
                    <div class="flex-column justify-center items-center border h-100 w-50">Ảnh</div>
                </div>
            </div>

            <div class="text-white p-sxs fs-lg semi-bold align-center border border-t cursor btn-open-barrier"
                 style="background: #0dd203">
                XÁC NHẬN VÀ MỞ BARRIER
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.btn-open-barrier {
    transition: all .3s;
    &:hover {
        background-color: tint(#0dd203, 20%) !important;
    }
}
</style>
