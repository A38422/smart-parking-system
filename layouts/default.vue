<template>
    <div class="app">
        <Layout :style="{ minHeight: '100vh' }">
            <Header class="layout-header-bar border-b">
                <div class="layout-logo">
                    <NuxtLink to="/">
                        <img src="@/static/logo.png" alt=""/>
                    </NuxtLink>
                </div>

                <BaseMoreAction :drop-down-menu="dropdownDownMenu"
                                @on-click="handleClickItem">
                    <span slot="title">
                        {{ user && user.name ? user.name : 'Nguyễn Văn A' }}
                        <Icon type="md-arrow-dropdown" size="20"></Icon>
                    </span>
                </BaseMoreAction>
            </Header>

            <Layout class="flex">
                <Sider width="220">
                    <Menu
                        :active-name="activeSidebar"
                        :open-names="openNames"
                        :theme="themeSidebar"
                        width="auto"
                        class="menu-item"
                    >
                        <MenuItem
                            v-for="(item, index) in menu"
                            :key="index"
                            :name="index"
                            :title="item.title"
                        >
                            <NuxtLink :to="item.path">
                                <Icon :type="item.icon" size="18"/>
                                <div v-if="openSidebar" class="title ml-xs">{{ item.title }}</div>
                            </NuxtLink>
                        </MenuItem>
                    </Menu>
                </Sider>

                <Layout>
                    <Content class="content-layout">
                        <Nuxt class="container"/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import menu from '@/constants/menu'

export default {
    // middleware: 'auth',

    data() {
        return {
            themeHeader: 'light',
            themeSidebar: 'light',
            activeHeader: '',
            activeSidebar: '0',
            isCollapsed: false,
            openSidebar: true,
            openNames: [],
            dropdownDownMenu: [
                { name: 'screen', label: 'Màn hình soát vé' },
                { name: 'profile', label: 'Thông tin cá nhân' },
                { name: 'logout', label: 'Đăng xuất' }
            ]
        }
    },

    computed: {
        ...mapGetters(['user']),

        menu() {
            if (this.user && this.user.is_admin) {
                return menu
            }
            return menu.filter((item) => !item.isAdmin)
        },
    },

    // watch: {
    //     $route: {
    //         deep: true,
    //         immediate: true,
    //         handler() {
    //             for (let i = 0; i < this.menu.length; i++) {
    //                 if (this.menu[i].path === this.$route.path) {
    //                     this.activeSidebar = i
    //                     break
    //                 }
    //             }
    //         }
    //     }
    // },

    created() {
        for (let i = 0; i < this.menu.length; i++) {
            if (this.menu[i].path === this.$route.path) {
                this.activeSidebar = i
                break
            }
        }
    },

    methods: {
        handleClickItem(name) {
            if (name === 'logout') this.$router.push('/login')
        }
    }
}
</script>
<style lang="less">
.app {
    margin-left: 0;
    //background: #f5f7f9;
    background: #ffffff;
    position: relative;
    overflow: hidden;

    .ivu-layout {
        background: #ffffff;
    }
}

.layout-logo {
    //width: 100px;
    height: 30px;
    float: left;
    position: relative;
    top: 8px;
    left: 20px;

    img {
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }
}

.layout-nav {
    margin: auto 0;
    line-height: 0;
    color: #031E39;
    transition: .3s all;
    cursor: pointer;

    &:hover {
        color: #2d8cf0;
    }
}

.layout-content {
    height: 100%;
    width: 100%;
}

.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    display: flex;
    justify-content: space-between;
}

.menu-item {
    height: 100%;
    overflow: auto;

    .ivu-menu-item {
        padding: 0;

        a {
            display: block;
            color: #031E39;
            padding: 14px 24px;

            .title {
                display: inline-block;
                overflow: hidden;
                width: 140px;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: bottom;
            }

            &:hover, &.nuxt-link-exact-active.nuxt-link-active {
                color: #2D8CF0;
            }
        }
    }
}

.content-layout {
    //padding: 12px;
    //background: #ffffff;
}

.container {
    height: 100%;
    width: 100%;
    //display: flex;
    //flex-direction: column;
}
</style>
