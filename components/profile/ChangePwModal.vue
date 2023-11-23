<template>
    <Modal
        v-model="visible"
        :title="title"
        width="500"
        class-name="vertical-center-modal form-change-pw"
        @on-visible-change="handleChangeVisible"
    >
        <Form
            ref="form"
            label-position="left"
            :model="formState"
            :rules="rules"
            :label-width="180"
        >
            <FormItem label="Mật khẩu cũ" prop="oldPassword">
                <Input
                    v-model="formState.oldPassword"
                    type="password"
                    password
                    placeholder="Nhập mật khẩu cũ"
                >
                </Input>
            </FormItem>
            <FormItem label="Mật khẩu mới" prop="newPassword">
                <Input
                    v-model="formState.newPassword"
                    type="password"
                    password
                    placeholder="Nhập mật khẩu mới"
                >
                </Input>
            </FormItem>
            <FormItem label="Xác nhận mật khẩu mới" prop="reNewPassword">
                <Input
                    v-model="formState.reNewPassword"
                    type="password"
                    password
                    placeholder="Nhập mật khẩu xác nhận mới"
                >
                </Input>
            </FormItem>
        </Form>

        <template #footer>
            <div class="footer-modal-create-member">
                <Button @click="handleClose">Đóng</Button>
                <Button type="primary" :loading="loading" @click="handleSubmit"
                    >Xác nhận
                </Button>
            </div>
        </template>
    </Modal>
</template>

<script>
export default {
    props: {
        dataEdit: {
            type: Object,
            default() {
                return {}
            },
        },
    },

    data() {
        return {
            visible: false,
            loading: false,
            formState: {
                oldPassword: null,
                newPassword: null,
                reNewPassword: null,
            },
        }
    },

    computed: {
        title() {
            return 'Đổi mật khẩu'
        },

        rules() {
            return {
                oldPassword: [
                    {
                        required: true,
                        validator: this.validateOldPass,
                        trigger: 'blur',
                    },
                ],
                newPassword: [
                    {
                        required: true,
                        validator: this.validatePass,
                        trigger: 'blur',
                    },
                ],
                reNewPassword: [
                    {
                        required: true,
                        validator: this.validateRePass,
                        trigger: 'blur',
                    },
                ],
            }
        },
    },

    methods: {
        open() {
            this.visible = true
        },

        close() {
            this.visible = false
        },

        handleClose() {
            this.close()
        },

        handleSubmit() {
            this.$refs.form.validate(async (valid) => {
                try {
                    if (valid) {
                        this.loading = true
                        const sourceApi = `${this.$api.CHANGE_PW}${this.formState.id}/`
                        await this.$axios.$post(sourceApi, {
                            new_password: this.formState.newPassword,
                            old_password: this.formState.oldPassword,
                        })

                        this.loading = false
                        this.close()
                        this.$Message.success({
                            content: 'Đổi mật khẩu thành công',
                            closable: true,
                        })
                        this.$emit('on-ok')
                    }
                } catch (e) {
                    this.loading = false
                    console.log('error: ', e)
                    if (e && e.response && e.response.status === 403) {
                        this.$Message.error({
                            content: 'Không được phép thực hiện hành động này',
                            closable: true,
                        })
                    } else if (
                        e &&
                        e.response &&
                        e.response.data &&
                        e.response.data.old_password &&
                        e.response.data.old_password[0].includes('Incorrect')
                    ) {
                        this.$Message.error({
                            content: 'Mật khẩu cũ không chính xác',
                            closable: true,
                        })
                    } else {
                        this.$Message.error({
                            content: 'Đổi mật khẩu thất bại',
                            closable: true,
                        })
                    }
                }
            })
        },

        setFormState(data) {
            this.formState =
                data && data.id
                    ? {
                          ...data,
                      }
                    : {
                          oldPassword: null,
                          newPassword: null,
                          reNewPassword: null,
                      }
        },

        handleChangeVisible(value) {
            if (!value) {
                this.$refs.form.resetFields()
            }
        },

        validatePass(rule, value, callback) {
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
            if (!value) {
                return callback(new Error('Vui lòng nhập mật khẩu mới'))
            } else if (!passwordRegex.test(value)) {
                return callback(
                    new Error(
                        'Mật khẩu phải từ 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
                    ),
                )
            }
            callback()
        },

        validateOldPass(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập mật khẩu cũ'))
            }
            callback()
        },

        validateRePass(rule, value, callback) {
            if (!value) {
                return callback(
                    new Error('Vui lòng nhập mật khẩu xác nhận mới'),
                )
            } else if (value !== this.formState.newPassword) {
                return callback(new Error('Mật khẩu không trùng khớp'))
            }
            callback()
        },
    },
}
</script>

<style lang="less">
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}

.footer-modal-create-member {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}

.mx-5 {
    margin: 0 5px;
}

.flex-row {
    display: flex;
    flex-direction: row;
}

.center {
    align-items: center;
}

.search-in-select {
    margin: 5px;
}

.form-change-pw {
    .ivu-modal-body {
        //min-height: 200px;
        max-height: 800px;
        //overflow: auto;
    }
}
</style>
