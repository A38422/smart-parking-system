<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutDetail'
})
</script>

<template>
    <div class="flex-column">
        <BaseFixedPageHeader>
            <p slot="title" class="fs-lg semi-bold">
                Chi tiết
            </p>
            <div slot="extend">
                <Icon type="ios-more" size="20" class="cursor"/>
            </div>
        </BaseFixedPageHeader>

        <BaseLayoutContainer class="mt-sm flex-1">
            <slot/>
        </BaseLayoutContainer>
    </div>
</template>

<style scoped lang="less">

</style>
