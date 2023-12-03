<script>
export default {
    name: 'Config',

    data() {
        return {
        }
    }
}
</script>

<template>
    <div class="flex-column w-100">
        <BaseFixedPageHeader>
            <p slot="title" class="fs-lg semi-bold">
                Cài đặt hệ thống
            </p>
        </BaseFixedPageHeader>

        <BaseLayoutContainer class="mt-sm flex-1 overflow-auto">
            <Tabs value="licence">
                <Tab-pane label="Bản quyền" name="licence">
                    <cai-dat-licence title-licence="Licence information" title-update-licence="Update licence"/>
                </Tab-pane>
                <Tab-pane label="Cấu hình" name="configLicence">
                    <cai-dat-general-config title="Cấu hình chung"/>
                    <cai-dat-config-server title="Cấu hình kết nối máy chủ quản lý"/>
                    <cai-dat-config-server title="Cấu hình kết nối máy chủ tin nhắn"/>
                </Tab-pane>
            </Tabs>
        </BaseLayoutContainer>
    </div>
</template>

<style scoped lang="less">

</style>
