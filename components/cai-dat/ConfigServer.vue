<script>
export default {
    name: "ConfigServer",

    props: {
        title: {
            type: String,
            default() {
                return ""
            }
        },
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        placeholder: {
            type: String,
            default() {
                return "Select"
            }
        },
    },

    data () {
        return {
            formValidate: {
                server: '',
                port: '',
                protocol: '',
                authentication: '',
                username: '',
                password: '',
            },
            ruleValidate: {
                server: [
                    { required: true, message: 'Server không được để trống', trigger: 'blur' }
                ],
                port: [
                    { required: true, message: 'Port không được để trống', trigger: 'blur' },
                ],
                protocol: [
                    { message: 'Vui lòng lựa chọn Protocol', trigger: 'change' }
                ],
                authentication: [
                    { message: 'Vui lòng lựa chọn Authentication', trigger: 'change' }
                ],
                username: [
                    { required: true, message: 'User không được để trống', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Vui lòng điền mật khẩu', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'Độ dài mật khẩu không dưới 6 ký tự', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Gửi thành công!');
                } else {
                    this.$Message.error('Xác thực biểu mẫu không thành công!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }


}
</script>

<template>
    <div class="ml-sxl">
        <div class="semi-bold mb-xl">
            {{ title }}
        </div>
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" style="width: 420px">
                <Form-item label="Server:" prop="server" >
                    <Input v-model="formValidate.server" placeholder="Domain or IP"></Input>
                </Form-item>
                <Form-item label="Port:" prop="port">
                    <Input v-model="formValidate.port" placeholder="port"></Input>
                </Form-item>
                <Form-item label="Protocols" prop="protocol">
                    <Select v-model="formValidate.protocol" placeholder="Choose">
                        <Option value="https">HTTPS</Option>
                        <Option value="http">HTTP</Option>
                        <Option value="tcp/ip">TCP/IP</Option>
                    </Select>
                </Form-item>
                <Form-item label="Authentication:" prop="authentication">
                    <Select v-model="formValidate.authentication" placeholder="Choose">
                        <Option value="username">Username</Option>
                        <Option value="phonenumbers">Phone numbers</Option>
                        <Option value="email">Email</Option>
                    </Select>
                </Form-item>
                <Form-item label="User name:" prop="username">
                    <Input v-model="formValidate.username" placeholder="Username"></Input>
                </Form-item>
                <FormItem label="Mật khẩu" prop="password">
                    <Input
                        v-model="formValidate.password"
                        type="password"
                        password
                        placeholder="Nhập mật khẩu"
                    >
                    </Input>
                </FormItem>
                <FormItem class="align-right">
                    <Button type="primary">Cập nhật</Button>
                </FormItem>
            </Form>
        </div>
    </div>

<!--    <div>-->
<!--        -->
<!--    </div>-->

</template>

<style scoped lang="less">

</style>
