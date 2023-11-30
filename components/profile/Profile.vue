<template>
    <div class="profile-form">
        <h1>{{ user.username || 'Admin' }}</h1>
        <div class="mt-xl">
            <Button type="info" ghost @click="handleOpenModal">
                <Icon type="md-create" />
                Chỉnh sửa
            </Button>
            <Button type="info" ghost @click="handleOpenPwModal">
                <Icon type="md-key" />
                Đổi mật khẩu
            </Button>
        </div>

        <div class="my-dxl" >
            <div class="flex-row mb-xs">
                <span class="d-block" style="width: 80px">Họ và tên: </span>
                <span>{{ user.first_name && user.last_name ? user.first_name + ' ' + user.last_name : '-' }}</span>
            </div>
            <div class="flex-row">
                <span class="d-block" style="width: 80px">Email: </span>
                <span>{{ user.email || '-' }}</span>
            </div>
        </div>

        <div class="logout">
            <NuxtLink to="/login">
                <Icon size="20" type="ios-exit-outline" />
                Đăng xuất
            </NuxtLink>
        </div>

        <ChangePwModal ref="refChangePwModal" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePwModal from '@/components/profile/ChangePwModal.vue'

export default {
    name: 'UserProfile',

    components: {
        ChangePwModal,
    },

    data() {
        return {

        }
    },

    computed: {
        ...mapGetters(['user']),
    },

    created() {

    },

    methods: {
        handleOpenModal() {

        },

        handleOpenPwModal() {
            this.$refs.refChangePwModal.open()
            this.$refs.refChangePwModal.setFormState({
                id: this.user.id,
                oldPassword: null,
                newPassword: null,
                reNewPassword: null,
            })
        },
    },
}
</script>
<style lang="less">
.profile-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logout {
        a {
            font-size: 16px;
            color: #031E39 !important;
        }

        a:hover {
            color: #2d8cf0 !important;
        }
    }
}
</style>
