<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutDetail',

    props: {
        dropdownDownMenu: {
            type: Array,
            default() {
                return []
            }
        }
    },

    methods: {
        handleClickItem(value) {
            this.$emit("on-click-more-action", value)
        }
    }
})
</script>

<template>
    <div class="flex-column">
        <BaseFixedPageHeader>
            <p slot="title" class="fs-lg semi-bold">
                Chi tiết
            </p>
            <div slot="extend">
                <BaseMoreAction :drop-down-menu="dropdownDownMenu"
                                @on-click="handleClickItem">
                    <Icon slot="title" type="ios-more" size="24"/>
                </BaseMoreAction>
            </div>
        </BaseFixedPageHeader>

        <BaseLayoutContainer class="mt-sm flex-1">
            <Row>
                <Col span="12">
                    <slot name="info-left"/>
                </Col>
                <Col span="12">
                    <slot name="info-right"/>
                </Col>
            </Row>
            <slot name="info-content"/>
        </BaseLayoutContainer>
    </div>
</template>

<style scoped lang="less">

</style>
