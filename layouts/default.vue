<template>
    <div class="layout">
        <Layout :style="{ minHeight: '100vh' }">
            <Header>
                <Menu
                    mode="horizontal"
                    :theme="themeHeader"
                    :active-name="activeHeader"
                >
                    <div class="layout-logo">
                        <NuxtLink to="/">
                            <img src="~/static/icon.png" alt=""/>
                        </NuxtLink>
                    </div>
                    <div class="layout-nav">
                        <NuxtLink to="/profile">
                            <Avatar
                                v-if="user && user.img"
                                size="32"
                                :src="user.img"
                                :style="{
                                  marginRight: '5px',
                                }"
                            />
                            <Avatar
                                v-else
                                size="32"
                                :style="{
                  background: '#0097a7',
                  fontFamily: 'arial, sans-serif',
                  marginRight: '5px',
                }"
                            >
                                {{ user && user.name ? user.name[0].toUpperCase() : 'A' }}
                            </Avatar>
                            {{ user && user.name ? user.name : 'Admin' }}
                        </NuxtLink>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider
                    ref="side1"
                    v-model="isCollapsed"
                    collapsible
                    :collapsed-width="78"
                    :style="{ background: '#ffffff' }"
                    @on-collapse="collapsedSidebar"
                >
                    <Menu
                        :active-name="activeSidebar"
                        :open-names="openNames"
                        :theme="themeSidebar"
                        width="auto"
                        :class="menuitemClasses"
                    >
                        <div v-for="item in menu" :key="item.key">
                            <Submenu
                                v-if="item.children && item.children.length > 0"
                                :name="item.key"
                                :title="item.title"
                            >
                                <template #title>
                                    <Icon
                                        v-if="openSidebar"
                                        :type="item.icon"
                                        :style="item.styleIcon"
                                    />
                                    <div v-if="openSidebar" class="title">{{ item.title }}</div>
                                    <Dropdown v-else placement="right">
                                        <Icon :type="item.icon" :style="item.styleIcon"/>
                                        <template #list>
                                            <DropdownMenu>
                                                <DropdownItem v-for="i in item.children" :key="i.key">
                                                    <NuxtLink :to="i.path" :title="i.title">
                                                        {{ i.title }}
                                                    </NuxtLink>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </template>
                                    </Dropdown>
                                </template>
                                <MenuItem
                                    v-for="i in item.children"
                                    :key="i.key"
                                    :name="i.key"
                                    :title="i.title"
                                >
                                    <NuxtLink :to="i.path">
                                        <div class="title">
                                            {{ i.title }}
                                        </div>
                                    </NuxtLink>
                                </MenuItem>
                            </Submenu>
                            <MenuItem v-else :name="item.key" :title="item.title">
                                <NuxtLink :to="item.path">
                                    <Icon :type="item.icon" :style="item.styleIcon"/>
                                    <div v-if="openSidebar" class="title">{{ item.title }}</div>
                                </NuxtLink>
                            </MenuItem>
                        </div>
                    </Menu>
                </Sider>
                <Layout>
                    <!--          <Header :style="{ padding: 0 }" class="layout-header-bar">-->
                    <!--            <Icon-->
                    <!--              :class="rotateIcon"-->
                    <!--              :style="{ margin: '0 20px' }"-->
                    <!--              type="md-menu"-->
                    <!--              size="24"-->
                    <!--              @click="collapsedSidebar"-->
                    <!--            ></Icon>-->
                    <!--          </Header>-->
                    <Content
                        class="content-layout"
                        :style="{
                          padding: '0 16px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                        }"
                    >
                        <base-bread-crumb></base-bread-crumb>
                        <Card class="custom-card-body" :style="{ flex: '1' }">
                            <Nuxt/>
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import menu from '../constants/menu'

export default {
    // middleware: 'auth',

    data() {
        return {
            themeHeader: 'dark',
            themeSidebar: 'light',
            activeHeader: '',
            activeSidebar: '0',
            isCollapsed: false,
            openSidebar: true,
            openNames: []
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

        rotateIcon() {
            return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
        },

        menuitemClasses() {
            return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
        }
    },

    watch: {
        $route: {
            deep: true,
            handler() {
                for (let i = 0; i < this.menu.length; i++) {
                    if (this.menu[i].children && this.menu[i].children.length > 0) {
                        for (let j = 0; j < this.menu[i].children.length; j++) {
                            if (this.menu[i].children[j].path === this.$route.path) {
                                this.activeSidebar = this.menu[i].children[j].key
                                break
                            }
                        }
                    } else if (this.menu[i].path === this.$route.path) {
                        this.activeSidebar = this.menu[i].key
                        break
                    } else if (this.$route.path && this.$route.path === '/profile') {
                        this.activeSidebar = null
                        break
                    }
                }
            }
        }
    },

    created() {
        for (let i = 0; i < this.menu.length; i++) {
            if (this.menu[i].children && this.menu[i].children.length > 0) {
                for (let j = 0; j < this.menu[i].children.length; j++) {
                    if (this.menu[i].children[j].path === this.$route.path) {
                        this.activeSidebar = this.menu[i].children[j].key
                        this.openNames = [this.menu[i].key]
                        break
                    }
                }
            } else if (this.menu[i].path === this.$route.path) {
                this.activeSidebar = this.menu[i].key
                this.openNames = [this.menu[i].key]
                break
            } else if (this.$route.path && this.$route.path === '/profile') {
                this.activeSidebar = null
                break
            }
        }

        if (
            this.$route.path.includes('/tai-chinh/tai-tro') ||
            this.$route.path.includes('/tai-chinh/muc-thu')
        ) {
            this.activeSidebar = '2-1'
            this.openNames = ['2']
        }
        if (this.$route.path.includes('/tai-chinh/loai-chi')) {
            this.activeSidebar = '2-2'
            this.openNames = ['2']
        }
    },

    methods: {
        collapsedSidebar(value) {
            // this.$refs.side1.toggleCollapse()
            // this.openSidebar = this.$refs.side1.value

            this.openSidebar = !value
        }
    }
}
</script>
<style lang="less">
.layout {
    margin-left: 0;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}

.layout-logo {
    width: 100px;
    height: 50px;
    float: left;
    position: relative;
    top: 8px;
    left: 20px;
    cursor: pointer;

    img {
        height: 100%;
        object-fit: cover;
    }
}

.layout-nav {
    /*width: 420px;*/
    /*margin: 0 20px 0 auto;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    a {
        color: white;
    }

    a:hover {
        color: #2d8cf0;
    }
}

.layout-footer-center {
    text-align: center;
}

.layout-con {
    height: 100%;
    width: 100%;
}

.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.menu-icon {
    cursor: pointer;
    transition: all 0.3s;
}

.rotate-icon {
    transform: rotate(-90deg);
}

.menu-item {
    height: 100%;
    overflow: auto;

    i {
        transform: translateX(0px);
        transition: font-size 0.2s ease, transform 0.2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .title {
        display: inline-block;
        overflow: hidden;
        width: 100px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width 0.2s ease 0.2s;
    }

    .ivu-select-dropdown {
        position: fixed !important;
        top: auto !important;

        .ivu-dropdown-item {
            padding: 0;

            a {
                display: block;
                padding: 7px 16px;
            }
        }
    }

    .ivu-menu-submenu .ivu-menu-item a {
        padding: 14px 45px;
    }

    .ivu-menu-item {
        padding: 0 !important;

        .title {
            margin-left: 8px;
        }

        a {
            display: block;
            padding: 14px 24px;
        }
    }

    .ivu-menu-submenu .ivu-menu-item {
        font-size: 12px;
    }

    .ivu-menu-submenu-title {
        z-index: auto;
    }

    a {
        color: #515a6e;
    }
}

.collapsed-menu {
    .title {
        width: 0;
        transition: width 0.2s ease;
    }

    i {
        transform: translateX(5px);
        transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .ivu-menu-submenu-title .ivu-icon-ios-arrow-down {
        display: none;
    }

    .ivu-menu-item {
        /*margin-left: -5px;*/
    }

    .ivu-menu-submenu .ivu-menu-item {
        display: none;
    }
}

.dev-run-preview .dev-run-preview-edit {
    display: none;
}

.is-active {
    color: #00b495 !important;
}

.content-layout {
    .custom-card-body {
        .ivu-card-body {
            width: 100%;
            height: 100%;
        }
    }
}

.logout-form a {
    color: white;
    margin-right: 10px;
}

.logout-form a:hover {
    color: #2d8cf0;
}
</style>
