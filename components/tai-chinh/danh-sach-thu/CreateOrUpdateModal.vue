<template>
    <Modal
        v-model="visible"
        :title="title"
        width="500"
        class-name="vertical-center-modal form-create-thu"
        @on-visible-change="handleChangeVisible"
    >
        <Form
            ref="form"
            label-position="left"
            :model="formState"
            :rules="rules"
            :label-width="130"
        >
            <!--      <FormItem v-if="!isUpdate" label="Chọn loại thu">-->
            <!--        <RadioGroup v-model="type" @on-change="handleChangeRadio">-->
            <!--          <Radio label="Thu định kỳ"></Radio>-->
            <!--          <Radio label="Tài trợ"></Radio>-->
            <!--        </RadioGroup>-->
            <!--      </FormItem>-->
            <FormItem
                v-if="type === 'Thu định kỳ'"
                label="Mức thu"
                prop="contributor"
            >
                <Select
                    v-model="formState.contributor"
                    filterable
                    not-found-text="Không có dữ liệu"
                    placeholder="Chọn mức thu"
                >
                    <Option
                        v-for="item in listContributor"
                        :key="item.id"
                        :value="item.id"
                        :label="item.year"
                    >
                    </Option>
                </Select>
            </FormItem>
            <FormItem v-if="type === 'Thu định kỳ'" label="Thành viên" prop="member">
                <Select
                    v-model="formState.member"
                    filterable
                    not-found-text="Không có dữ liệu"
                    placeholder="Chọn thành viên"
                >
                    <Option
                        v-for="item in listMember"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                    >
                        <span>{{ item.id }}.</span>
                        <Avatar v-if="item.img" :src="item.img" class="mx-5"/>
                        <Avatar
                            v-else
                            src="https://i.imgur.com/WzMrY0n.png"
                            class="mx-5"
                        />
                        {{ item.name }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem v-if="type === 'Thu định kỳ'" label="Ngày thu" prop="date">
                <Input v-model="formState.date" type="date"></Input>
            </FormItem>
            <FormItem v-else label="Nhà tài trợ" prop="sponsor">
                <Select
                    v-model="formState.sponsor"
                    filterable
                    not-found-text="Không có dữ liệu"
                    placeholder="Chọn nhà tài trợ"
                    @on-change="handleChangeSelect"
                >
                    <Option
                        v-for="item in listSponsor"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                    >
                    </Option>
                </Select>
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
        dataMember: {
            type: Array,
            default() {
                return []
            },
        },

        dataSponsor: {
            type: Array,
            default() {
                return []
            },
        },

        dataContributionLevel: {
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
                member: null,
                contributor: null,
                sponsor: null,
                date: null,
            },
            type: 'Thu định kỳ',
        }
    },

    computed: {
        title() {
            return this.isUpdate ? 'Cập nhật thu' : 'Thêm mới thu'
        },

        rules() {
            return {
                member: [
                    {
                        required: true,
                        validator: this.validateMember,
                        trigger: 'blur'
                    },
                ],
                contributor: [
                    {
                        required: true,
                        validator: this.validateContributor,
                        trigger: 'blur',
                    },
                ],
                sponsor: [
                    {
                        required: true,
                        validator: this.validateSponsor,
                        trigger: 'blur'
                    },
                ],
                date: [
                    {
                        required: true,
                        validator: this.validateDate,
                        trigger: 'blur'
                    },
                ],
            }
        },

        listMember() {
            return this.dataMember
        },

        listContributor() {
            return this.dataContributionLevel
        },

        listSponsor() {
            return this.dataSponsor
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
                            ? `${this.$api.INCOMES}${this.formState.id}/`
                            : this.$api.INCOMES
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
                    }
                    if (
                        e &&
                        e.response &&
                        e.response.data &&
                        e.response.data[0].includes('unique')
                    ) {
                        this.$Message.error({
                            content: 'Thành viên đã tồn tại mức thu này',
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
                        member: null,
                        contributor: null,
                        sponsor: null,
                        date: null,
                    }
        },

        handleChangeVisible(value) {
            if (!value) {
                this.type = 'Thu định kỳ'
                setTimeout(() => {
                    this.$refs.form.resetFields()
                }, 100)
            }
        },

        validateContributor(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng chọn mức thu'))
            }
            callback()
        },

        validateDate(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập ngày thu'))
            }
            callback()
        },

        validateMember(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập tên thành viên'))
            }
            callback()
        },

        validateSponsor(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng chọn nhà tài trợ'))
            }
            callback()
        },

        handleChangeRadio(value) {
            // console.log(value)
            this.$refs.form.resetFields()
        },

        handleChangeSelect(value) {
            this.formState.date = this.listSponsor.find((item) => item.id === value)
                ? this.listSponsor.find((item) => item.id === value).start_date
                : null
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

.form-create-thu {
    .ivu-modal-body {
        height: 350px;
        overflow: auto;
    }
}
</style>
