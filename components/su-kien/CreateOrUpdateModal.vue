<template>
    <Modal
        v-model="visible"
        :title="title"
        width="500"
        class-name="vertical-center-modal form-create-event"
        @on-visible-change="handleChangeVisible"
    >
        <Form
            ref="form"
            label-position="left"
            :model="formState"
            :rules="rules"
            :label-width="140"
        >
            <FormItem label="Tên sự kiện" prop="name">
                <Input
                    v-model="formState.name"
                    placeholder="Nhập tên sự kiện"
                ></Input>
            </FormItem>
            <FormItem label="Địa điểm" prop="location">
                <Input
                    v-model="formState.location"
                    placeholder="Nhập dịa điểm"
                ></Input>
            </FormItem>
            <FormItem label="Ngày diễn ra" prop="date">
                <Input v-model="formState.date" type="date"></Input>
            </FormItem>
            <FormItem label="Mô tả" prop="description">
                <Input
                    v-model="formState.description"
                    :rows="3"
                    type="textarea"
                    placeholder="Nhập mô tả"
                ></Input>
            </FormItem>
            <FormItem label="Thành viên tham gia" prop="attendees">
                <Select
                    v-model="formState.attendees"
                    multiple
                    filterable
                    :max-tag-count="3"
                    not-found-text="Không có dữ liệu"
                    :clearable="true"
                    placeholder="Chọn thành viên"
                >
                    <Option
                        v-for="item in listAttendees"
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
                name: '',
                date: null,
                description: '',
                attendees: [],
            },
        }
    },

    computed: {
        title() {
            return this.isUpdate ? 'Cập nhật sự kiện' : 'Thêm mới sự kiện'
        },

        rules() {
            return {
                name: [
                    {
                        required: true,
                        validator: this.validateName,
                        trigger: 'blur',
                    },
                ],
                date: [
                    {
                        required: true,
                        validator: this.validateDate,
                        trigger: 'blur',
                    },
                ],
                location: [
                    {
                        required: true,
                        validator: this.validateLocation,
                        trigger: 'blur',
                    },
                ],
            }
        },

        listAttendees() {
            return this.familyTree.filter((item) => !item.ddate)
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
                            ? `${this.$api.EVENT}${this.formState.id}/`
                            : this.$api.EVENT
                        await this.$axios[method](sourceApi, {
                            ...this.formState,
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
                          name: '',
                          date: null,
                          description: '',
                          attendees: [],
                      }
        },

        handleChangeVisible(value) {
            if (!value) {
                this.$refs.form.resetFields()
            }
        },

        validateName(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập tên sự kiện'))
            }
            callback()
        },

        validateDate(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng chọn ngày'))
            }
            callback()
        },

        validateLocation(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập địa điểm'))
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

.form-create-event {
    .ivu-modal-body {
        min-height: 400px;
        max-height: 800px;
        //overflow: auto;
    }
}
</style>
