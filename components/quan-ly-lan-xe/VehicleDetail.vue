<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VehicleDetail',

    data() {
        return {
            dropdownDownMenu: [
                { name: 'lost_ticket', label: 'Hủy kích hoạt' },
                { name: 'check_out', label: 'Cập nhật' },
            ]
        }
    }
})
</script>

<template>
    <BaseLayoutDetail :dropdown-down-menu="dropdownDownMenu">
        <Row slot="info-left">
            <BaseInformationItem span="13" label="Tên làn" content="Làn 1"/>
            <BaseInformationItem span="13" label="Loại làn" content="Làn ra"/>
            <BaseInformationItem span="13" label="Ngày tạo" content="10:45 22/02/2023"/>
        </Row>
        <Row slot="info-right">
            <BaseInformationItem span="13" label="" content=""/>
            <BaseInformationItem span="13" label="Khu vực" content="Vật lý"/>
            <BaseInformationItem span="13" label="Xe" content=""/>
        </Row>
        <div slot="info-content">
            <BaseInformationItem span="13" label="Access control" content=""/>
            <table>
                <tr>
                    <th>Stt</th>
                    <th>Tên thiết bị</th>
                    <th>Loại</th>
                    <th>Mã thiết bị</th>
                    <th>Giao thức</th>
                    <th>Chi tiết</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>BEW2</td>
                    <td>RFID</td>
                    <td>544282599</td>
                    <td>MQTT</td>
                    <td>topic_access_control</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>FSF2-ODB</td>
                    <td>Face ID</td>
                    <td>544282981</td>
                    <td>MQTT</td>
                    <td>topic_access_control</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>FSF2-ODB</td>
                    <td>Finger ID</td>
                    <td>544282981</td>
                    <td>MQTT</td>
                    <td>topic_access_control</td>
                </tr>
            </table>
        </div>
    </BaseLayoutDetail>
</template>

<style scoped lang="less">
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>
