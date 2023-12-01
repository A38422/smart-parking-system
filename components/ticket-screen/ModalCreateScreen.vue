<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ModalCreateScreen',

    data() {
        return {
            visible: false,
            loading: false,
            formState: {
                name: '',
                vehicles: null,
            },
            data1: this.getMockData(),
            targetKeys1: this.getTargetKeys()
        }
    },

    computed: {
        rules() {
            return {
                name: [
                    {
                        required: true,
                        // validator: this.validateAmout,
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

        getMockData() {
            const mockData = [];
            for (let i = 1; i <= 20; i++) {
                mockData.push({
                    key: i.toString(),
                    label: 'Content ' + i,
                    description: 'The desc of content  ' + i,
                    disabled: false
                });
            }
            return mockData;
        },

        getTargetKeys() {
            return this.getMockData()
                .filter(() => Math.random() * 2 > 1)
                .map(item => item.key);
        },

        render1(item) {
            return item.label;
        },

        handleChange1(newTargetKeys, direction, moveKeys) {
            console.log(newTargetKeys);
            console.log(direction);
            console.log(moveKeys);
            this.targetKeys1 = newTargetKeys;
        },

        handleSubmit() {
            this.$refs.form.validate(async (valid) => {
                try {
                    if (valid) {
                        this.loading = true
                        await this.$axios.post(this.$api.CONTRIBUTION, {
                            ...this.formState,
                        })

                        this.loading = false
                        this.close()
                        this.$Message.success({
                            content: `'Thêm mới thành công`,
                            closable: true,
                        })
                        this.$emit('on-ok')
                    }
                } catch (e) {
                    this.loading = false
                    console.log('error: ', e)
                    this.$Message.error({
                        content: `Thêm mới thất bại`,
                        closable: true,
                    })
                }
            })
        },

        handleChangeVisible(value) {
            if (!value) {
                this.$refs.form.resetFields()
            }
        },

        validateAmout(rule, value, callback) {
            if (!value) {
                return callback(new Error('Vui lòng nhập tên!'))
            }
            callback()
        },
    },
})
</script>

<template>
    <Modal
        v-model="visible"
        title="Tạo mới màn hình"
        width="700"
        class-name="vertical-center-modal form-create-screen"
        @on-visible-change="handleChangeVisible"
    >
        <Form
            ref="form"
            :model="formState"
            :rules="rules"
            label-position="top"
        >
            <FormItem label="Tên" prop="name">
                <Input v-model="formState.name" placeholder="Nhập tên"/>
            </FormItem>
            <FormItem label="Làn xe" prop="vehicles">
                <div style="font-style: italic">Chọn tối đa 4 làn xe trên 1 màn hình</div>
                <Transfer
                    :titles="['Nguồn', 'Đích']"
                    :data="data1"
                    :target-keys="targetKeys1"
                    :render-format="render1"
                    :list-style="{
                        width: '300px',
                    }"
                    @on-change="handleChange1"/>
            </FormItem>
        </Form>

        <template #footer>
            <div class="footer-modal-create-member">
                <Button @click="handleClose">Đóng</Button>
                <Button type="primary" :loading="loading" @click="handleSubmit">
                    Xác nhận
                </Button>
            </div>
        </template>
    </Modal>
</template>

<style lang="less">
.form-create-screen {
    .ivu-modal-body {
        height: fit-content;
        overflow: auto;
    }
}
</style>
