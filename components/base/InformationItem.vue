<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InformationItem',

    props: {
        span: {
            type: String,
            default() {
                return '8'
            }
        },
        label: {
            type: String,
            default() {
                return ""
            }
        },
        content: {
            type: String,
            default() {
                return ""
            }
        },
    }
})
</script>

<template>
    <Row class-name="mt-xs">
        <Col :span="span" class="semi-bold">{{ label }}: </Col>
        <Col>{{ content }}</Col>
    </Row>
</template>

<style scoped lang="less">

</style>
