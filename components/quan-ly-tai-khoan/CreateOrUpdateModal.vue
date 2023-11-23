<template>
    <Modal
        v-model="visible"
        :title="title"
        width="500"
        class-name="vertical-center-modal form-create-account"
        @on-visible-change="handleChangeVisible"
    >
        <Form
            ref="form"
            label-position="left"
            :model="formState"
            :rules="rules"
            :label-width="145"
        >
            <FormItem label="Liên kết thành viên" prop="member">
                <Select
                    v-model="formState.member"
                    filterable
                    not-found-text="Không có dữ liệu"
                    :clearable="true"
                    :disabled="isUpdate"
                    placeholder="Chọn thành viên"
                >
                    <Option
                        v-for="item in listMember"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                    >
                        <span>{{ item.id }}.</span>
                        <Avatar v-if="item.img" :src="item.img" class="mx-5" />
                        <Avatar
                            v-else
                            src="https://i.imgur.com/WzMrY0n.png"
                            class="mx-5"
                        />
                        {{ item.name }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem v-if="!isUpdate" label="Tài khoản" prop="username">
                <Input
                    v-model="formState.username"
                    placeholder="Nhập tài khoản"
                >
                </Input>
            </FormItem>
            <FormItem v-if="!isUpdate" label="Mật khẩu" prop="password">
                <Input
                    v-model="formState.password"
                    type="password"
                    password
                    placeholder="Nhập mật khẩu"
                >
                </Input>
            </FormItem>
            <FormItem
                v-if="!isUpdate"
                label="Xác nhận mật khẩu"
                prop="rePassword"
            >
                <Input
                    v-model="formState.rePassword"
                    type="password"
                    password
                    placeholder="Nhập mật khẩu xác nhận"
                >
                </Input>
            </FormItem>
            <FormItem label="Vai trò" prop="role">
                <Select v-model="formState.role" placeholder="Chọn vai trò">
                    <Option
                        v-for="(item, index) in listRoles"
                        :key="index"
                        :value="item.value"
                    >
                        {{ item.label }}
                    </Option>
                </Select>
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
import { roles } from '~/constants/dataSelect'

export default {
    props: {
        familyTree: {
            type: Array,
            default() {
                return []
            },
        },

        isUpdate: {
            type: Boolean,
            default() {
                return false
            },
        },

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
                username: null,
                password: null,
                rePassword: null,
                role: 'member',
                member: null,
            },
        }
    },

    computed: {
        title() {
            return this.isUpdate ? 'Thay đổi vai trò' : 'Thêm mới tài khoản'
        },

        rules() {
            return {
                username: [
                    {
                        required: true,
                        validator: this.checkUsername,
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        validator: this.validatePass,
                        trigger: 'blur',
                    },
                ],
                rePassword: [
                    {
                        required: true,
                        validator: this.validateRePass,
                        trigger: 'blur',
                    },
                ],
                role: [
                    {
                        required: true,
                        validator: this.validateRole,
                        trigger: 'blur',
                    },
                ],
                member: [
                    {
                        required: true,
                        validator: this.validateMember,
                        trigger: 'blur',
                    },
                ],
            }
        },

        listMember() {
            if (this.isUpdate) {
                return this.familyTree
            }
            return this.familyTree.filter((item) => !item.user)
        },

        listRoles() {
            return roles
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
                        const method = this.isUpdate ? '$patch' : '$post'
                        const sourceApi = this.isUpdate
                            ? `${this.$api.USER}${this.formState.id}/`
                            : this.$api.USER
                        await this.$axios[method](sourceApi, {
                            ...this.formState,
                            is_admin: this.formState.role === 'admin',
                        })

                        this.loading = false
                        this.close()
                        this.$Message.success({
                            content: `${
                                this.isUpdate ? 'Cập nhật' : 'Thêm mới'
                            } thành công`,
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
                        e.response.data[0].includes('Tài khoản')
                    ) {
                        this.$Message.error({
                            content: e.response.data[0],
                            closable: true,
                        })
                    } else {
                        this.$Message.error({
                            content: `${
                                this.isUpdate ? 'Cập nhật' : 'Thêm mới'
                            } thất bại`,
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
                          username: null,
                          password: null,
                          rePassword: null,
                          role: 'member',
                          member: null,
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
                return callback(new Error('Vui lòng nhập mật khẩu'))
            } else if (!passwordRegex.test(value)) {
                return callback(
                    new Error(
                        'Mật khẩu phải từ 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
                    ),
                )
            }
            callback()
        },

        validateRePass(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập mật khẩu xác nhận'))
            } else if (value !== this.formState.password) {
                return callback(new Error('Mật khẩu không trùng khớp'))
            }
            callback()
        },

        checkUsername(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập tài khoản'))
            }
            callback()
        },

        validateRole(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng chọn vai trò'))
            }
            callback()
        },

        validateMember(rule, value, callback) {
            if (!value) {
                return callback(
                    new Error('Vui lòng chọn thành viên để liên kết tài khoản'),
                )
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

.form-create-account {
    .ivu-modal-body {
        //min-height: 300px;
        max-height: 800px;
        //overflow: auto;
    }
}
</style>
