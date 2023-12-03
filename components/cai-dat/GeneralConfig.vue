<script>
export default {
    name: "GeneralConfig",
    props: {
        title: {
            type: String,
            default() {
                return ""
            }
        },
    }
}
</script>

<template>
    <div class="mb-sxl ml-sxl">
        <div class="semi-bold mb-xxs">
            {{ title }}
        </div>
        <div>
            <Row>
                <Col span="3" offset="1">Thời gian lưu nhật ký:</Col>
                <Col class="align-item-center" span="2">
                    <p>120 days</p>
                    <Icon class="ml-xxs" type="md-create" size="15"/>
                </Col>
                <Col span="3" offset="1">Tổng số đỗ xe máy:</Col>
                <Col class="align-item-center" span="2">
                    <p>12321</p>
                    <Icon class="ml-xxs" type="md-create" size="15"/>
                </Col>
                <Col span="3" offset="1">Số xe máy trong bãi</Col>
                <Col class="align-item-center" span="2">
                    <p>19321</p>
                    <Icon class="ml-xxs" type="md-create" size="15"/>
                </Col>
            </Row>
            <Row>
                <Row>
                    <Col span="3" offset="1">Thời gian lưu ảnh:</Col>
                    <Col class="align-item-center" span="2">
                        <p>30 days</p>
                        <Icon class="ml-xxs" type="md-create" size="15"/>
                    </Col>
                    <Col span="3" offset="1">Tổng số đỗ ô tô:</Col>
                    <Col class="align-item-center" span="2">
                        <p>218</p>
                        <Icon class="ml-xxs" type="md-create" size="15"/>
                    </Col>
                    <Col span="3" offset="1">Số xe ô tô trong bãi</Col>
                    <Col class="align-item-center" span="2">
                        <p>218</p>
                        <Icon class="ml-xxs" type="md-create" size="15"/>
                    </Col>
                </Row>
            </Row>
        </div>
    </div>
</template>

<style scoped lang="less">
.align-item-center{
    align-items: initial;
    display: flex;
}
</style>
