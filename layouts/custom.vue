<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';

export default defineComponent({
    middleware: 'auth',

    data() {
        return {
            dropdownDownMenu: [
                { name: 'manage', label: 'Quản lý hệ thống' },
                { name: 'profile', label: 'Thông tin cá nhân' },
                { name: 'logout', label: 'Đăng xuất' }
            ],
        }
    },

    computed: {
        ...mapGetters(['user']),
    },

    created() {

    },

    methods: {
        handleClickItem(name) {
            if (name === 'logout') this.$router.push('/login')
            if (name === 'profile') this.$router.push('/profile')
            if (name === 'manage') this.$router.push('/nhat-ky-xe')
        },


    }
})
</script>

<template>
    <div class="app">
        <Layout :style="{ minHeight: '100vh' }">
            <Header class="layout-header-bar border-b">
                <div class="flex-row items-center">
                    <ticket-screen-select-screen/>
                    <ticket-screen-create-screen/>
                </div>

                <BaseMoreAction :drop-down-menu="dropdownDownMenu"
                                @on-click="handleClickItem">
                    <span slot="title">
                        {{ user && user.username ? user.username : 'Admin' }}
                        <Icon type="md-arrow-dropdown" size="20"></Icon>
                    </span>
                </BaseMoreAction>
            </Header>

            <Content class="content-layout">
                <Nuxt class="container"/>
            </Content>
        </Layout>
    </div>
</template>

<style scoped lang="less">

</style>
