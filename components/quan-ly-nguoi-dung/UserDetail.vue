<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'UserDetail',

    data() {
        return {
            dropdownDownMenu: [
                { name: 'actived', label: 'Kích hoạt', className: 'text-primary' },
                { name: 'deactive', label: 'Huỷ kích hoạt', className: 'text-error' },
                { name: 'edit', label: 'Chỉnh sửa' },
                { name: 'new_password', label: 'Cập nhật mật khẩu mới' },
            ]
        }
    }
})
</script>

<template>
    <BaseLayoutDetail :dropdown-down-menu="dropdownDownMenu">
        <Row slot="info-content" class="ml-sxl">
            <BaseInformationItem span="10" label="Họ và tên" content="Nguyễn Văn A"/>
            <BaseInformationItem span="10" label="Email" content="hoannq@spro.net.vn"/>
            <BaseInformationItem span="10" label="User name" content="hoannq"/>
            <BaseInformationItem span="10" label="Admin" content="Không"/>
            <BaseInformationItem span="10" label="Thời điểm tạo" content="10:45 22/02/2023"/>
            <BaseInformationItem span="10" label="Đăng nhập lần cuối" content="10:45 22/02/2023"/>
            <BaseInformationItem span="10" label="Trạng thái" content="Kích hoạt" style-content="text-primary"/>
        </Row>


        <div slot="info-content"/>
    </BaseLayoutDetail>
</template>

<style scoped lang="less">

</style>
