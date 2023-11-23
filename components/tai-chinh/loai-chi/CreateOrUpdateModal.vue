<template>
    <Modal
        v-model="visible"
        :title="title"
        width="500"
        class-name="vertical-center-modal form-create-loai-chi"
        @on-visible-change="handleChangeVisible"
    >
        <Form
            ref="form"
            label-position="left"
            :model="formState"
            :rules="rules"
            :label-width="130"
        >
            <FormItem label="Tên loại chi" prop="name">
                <Input v-model="formState.name" placeholder="Nhập tên loại chi"></Input>
            </FormItem>
            <FormItem label="Ghi chú" prop="note">
                <Input
                    v-model="formState.note"
                    :rows="3"
                    type="textarea"
                    placeholder="Nhập ghi chú"
                ></Input>
            </FormItem>
        </Form>

        <template #footer>
            <div class="footer-modal-create-member">
                <Button @click="handleClose">Đóng</Button>
                <Button type="primary" :loading="loading" @click="handleSubmit"
                >Xác nhận
                </Button
                >
            </div>
        </template>
    </Modal>
</template>

<script>
export default {
    props: {
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
                name: '',
                note: '',
            },
        }
    },

    computed: {
        title() {
            return this.isUpdate ? 'Cập nhật loại chi' : 'Thêm mới loại chi'
        },

        rules() {
            return {
                name: [
                    {
                        required: true,
                        validator: this.validateName,
                        trigger: 'blur'
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
                        const method = this.isUpdate ? '$put' : '$post'
                        const sourceApi = this.isUpdate
                            ? `${this.$api.EXPENSE_CATEGORIES}${this.formState.id}/`
                            : this.$api.EXPENSE_CATEGORIES
                        await this.$axios[method](sourceApi, {
                            ...this.formState,
                        })

                        this.loading = false
                        this.close()
                        this.$Message.success({
                            content: `${this.isUpdate ? 'Cập nhật' : 'Thêm mới'} thành công`,
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
                    } else {
                        this.$Message.error({
                            content: `${this.isUpdate ? 'Cập nhật' : 'Thêm mới'} thất bại`,
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
                        name: '',
                        note: '',
                    }
        },

        handleChangeVisible(value) {
            if (!value) {
                this.$refs.form.resetFields()
            }
        },

        validateName(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập tên loại chi'))
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

.form-create-loai-chi {
    .ivu-modal-body {
        max-height: 400px;
        overflow: auto;
    }
}
</style>
