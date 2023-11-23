<template>
    <div class="login-form">
        <Form
            ref="loginForm"
            :model="vm"
            :rules="rules"
            :style="{ width: '100%' }"
        >
            <div class="flex-column middle mb-md">
                <img
                    src="~/static/icon.png"
                    :style="{ width: '120px' }"
                    alt=""
                />
                <span :style="{ 'font-size': '18px', 'font-weight': '600' }"
                    >ĐĂNG NHẬP</span
                >
            </div>
            <FormItem label="Tài khoản" prop="username">
                <Input
                    v-model="vm.username"
                    placeholder="Nhập tài khoản"
                    @keyup.enter.native="login"
                >
                    <Icon slot="prepend" type="ios-person-outline"></Icon>
                </Input>
            </FormItem>
            <FormItem label="Mật khẩu" prop="password">
                <Input
                    v-model="vm.password"
                    type="password"
                    password
                    placeholder="Nhập mật khẩu"
                    @keyup.enter.native="login"
                >
                    <Icon slot="prepend" type="ios-lock-outline"></Icon>
                </Input>
            </FormItem>

            <div v-if="error">
                <Alert type="error">
                    {{ error }}
                </Alert>
            </div>

            <FormItem class="mt-50">
                <Button
                    :loading="loading"
                    type="success"
                    :style="{ width: '100%' }"
                    @click="login"
                >
                    Đăng nhập
                </Button>
            </FormItem>
            <div :style="{ 'text-align': 'center' }">
                <span> Chưa có tài khoản? </span>
                <NuxtLink to="/login">Đăng ký</NuxtLink>
            </div>
        </Form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'login',

    data() {
        return {
            vm: {
                username: '',
                password: '',
            },
            error: '',
            loading: false,
        }
    },

    computed: {
        ...mapGetters(['accessToken', 'refreshToken']),

        rules() {
            return {
                password: [{ validator: this.validatePass, trigger: 'blur' }],
                username: [{ validator: this.checkUsername, trigger: 'blur' }],
            }
        },
    },

    created() {
        if (this.refreshToken && this.accessToken) {
            this.logout()
        }
        localStorage.clear()
    },

    methods: {
        validatePass(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập mật khẩu'))
            }
            callback()
        },

        checkUsername(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập tài khoản'))
            }
            callback()
        },

        login() {
            if (this.loading) return ''
            this.error = ''
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    try {
                        this.loading = true
                        const res = await this.$axios.$post(this.$api.LOGIN, {
                            ...this.vm,
                        })
                        this.updateStore(res)
                        this.loading = false
                    } catch (e) {
                        this.loading = false
                        if (e && e.response && e.response.status === 401) {
                            this.error =
                                'Tài khoản hoặc mật khẩu không chính xác'
                        } else {
                            this.error = 'Có lỗi xảy ra'
                        }
                    }
                }
            })
        },

        async logout() {
            try {
                await this.$axios.$post(this.$api.LOGOUT, {
                    refresh_token: this.refreshToken,
                })
                this.handleLogout()
            } catch (e) {
                console.log('error', e)
                this.handleLogout()
            }
        },

        handleLogout() {
            if (this.$route.name !== 'login') {
                this.$router.push('/login')
            }

            this.$store.commit('DELETE_ACCESS_TOKEN')
            this.$store.commit('DELETE_REFRESH_TOKEN')
            this.$store.commit('DELETE_ACCESS_EXP')
            this.$store.commit('DELETE_USER')
        },

        updateStore(res) {
            this.$store.commit('SET_ACCESS_TOKEN', res.access)
            this.$store.commit('SET_REFRESH_TOKEN', res.refresh)
            this.$store.commit('SET_REFRESH_TOKEN', res.refresh)
            this.$store.commit('SET_ACCESS_EXP', res.access_exp)
            this.$store.commit('SET_USER', res.user)
            this.$router.push('/')
            this.$Message.success({
                content: 'Đăng nhập thành công',
                closable: true,
            })
        },
    },
}
</script>
<style lang="less">
.login-form {
    width: 400px;
    margin: 0 auto;
    background: white;
    padding: 50px;
    border-radius: 5px;
    border: 1px solid #deece7;
    /*box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.1);*/
    z-index: 2;

    .ivu-input-suffix {
        z-index: 3;
    }
}

.flex-column {
    display: flex;
    flex-direction: column;
}

.middle {
    align-items: center;
}

.center {
    justify-content: center;
}

.mb-sm {
    margin-bottom: 10px;
}

.mb-md {
    margin-bottom: 20px;
}

.mt-sm {
    margin-top: 10px;
}

.mt-50 {
    margin-top: 50px;
}
</style>
