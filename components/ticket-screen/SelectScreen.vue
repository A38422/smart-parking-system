<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SelectScreen',

    data() {
        return {
            selectedScreen: null,
            listScreen: [],
        }
    }
})
</script>

<template>
    <Select
        v-model="selectedScreen"
        not-found-text="Không có dữ liệu"
        placeholder="Chọn màn hình"
        style="width: 180px"
    >
        <Option
            v-for="item in listScreen"
            :key="item.id"
            :value="item.id"
            :label="item.name"
        >
            {{ item.name }}
        </Option>
    </Select>
</template>

<style scoped lang="less">

</style>
