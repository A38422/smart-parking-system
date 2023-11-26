<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MoreAction',

    props: {
        dropDownMenu: {
            type: Array,
            default() {
                return []
            }
        }
    },

    methods: {
        handleClickItem(name) {
            this.$emit('on-click', name)
        }
    }
})
</script>

<template>
    <Dropdown class="layout-nav"
              trigger="click"
              @on-click="handleClickItem">
        <slot name="title"/>
        <DropdownMenu slot="list">
            <DropdownItem v-for="(item, index) in dropDownMenu"
                          :key="index"
                          :name="item.name">
                {{ item.label }}
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<style scoped lang="less">

</style>
