<script>
export default {
    name: "Licence",
    props: {
        titleLicence: {
            type: String,
            default() {
                return ""
            }
        },
        titleUpdateLicence: {
            type: String,
            default() {
                return ""
            }
        }
    }
}

</script>

<template>
    <div>
        <div class="semi-bold ml-sxl">
            {{ titleLicence }}
        </div>
        <div>
            <br>
            <Row class-name="line-weigh">
                <Col span="5" offset="1">Product:</Col>
                <Col>SPRO Smart Parking System</Col>
            </Row>
            <br>
            <Row class-name="line-weigh">
                <Col span="5" offset="1">Copyright:</Col>
                <Col>Công ty TNHH công nghệ SPRO</Col>
            </Row>
            <br>
            <Row class-name="line-weigh">
                <Col span="5" offset="1">Licence code:</Col>
                <Col>D201F-QWRNM-9BCFK-VNFHU-X0LT3</Col>
            </Row>
            <br>
            <Row class-name="line-weigh">
                <Col span="5" offset="1">Activation date:</Col>
                <Col>21/07/2023</Col>
            </Row>
            <br>
            <Row class-name="line-weigh">
                <Col span="5" offset="1">Expiration date:</Col>
                <Col>21/07/2029</Col>
            </Row>
            <br>
            <Row class-name="line-weigh">
                <Col span="5" offset="1">Phiên bản:</Col>
                <Col>1.0.01</Col>
            </Row>
            <br>
            <Row class-name="line-weigh">
                <Col span="5" offset="1">Remaining:</Col>
                <Col class="text-success">299 days</Col>
            </Row>
        </div>
        <div class="semi-bold ml-sxl mt-sxl">
            {{ titleUpdateLicence }}
        </div>
        <Row class-name="line-weigh">
            <Col offset="1">
                <br>
                To use another licence, please select <b>change licence</b> below
            </Col>
        </Row>
        <Row>
            <Col offset="1">
                In case you do not have a licence, please contact hotline <span class="text-primary cursor">(+84) 912192206</span>
                or <span class="text-primary cursor">contact@spro.net.vn</span>
            </Col>
        </Row>
        <Row>
            <Col span="5" offset="1">
                <div class="mt-lg d-flex align-item cursor">
                    <Icon type="md-cart" size="25"/>
                    <span class="text-primary ml-xl"> Update licence online</span>
                </div>
            </Col>
            <Col>
                <div class="line-weigh ml-dxl mt-lg d-flex align-item cursor">
                    <Icon type="md-key" size="20"/>
                    <span class="text-primary ml-sm "> Update licence online</span>
                </div>
            </Col>
        </Row>


    </div>
</template>

<style scoped lang="less">
.line-weigh {
    line-height: 15px;
}

.align-item {
    align-items: center;
}
</style>
