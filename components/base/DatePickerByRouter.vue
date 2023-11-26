<script>
import { convertDateTimeToDatePicker, formatDateLocal } from '~/utils/dateFormatter';

export default {
    name: "DatePickerByRouter",

    data() {
        return {
            timeRange: []
        }
    },

    created() {
        if (
            this.$route.query &&
            this.$route.query.date_before &&
            this.$route.query.date_after
        ) {
            this.timeRange = [
                formatDateLocal(this.$route.query.date_before),
                formatDateLocal(this.$route.query.date_after),
            ]
        }
    },

    methods: {
        handleChangeTime(value) {
            const query = {
                ...this.$route.query,
                date_before: convertDateTimeToDatePicker(value[0]),
                date_after: convertDateTimeToDatePicker(value[1]),
            }

            if (query.page) delete query.page
            if (query.date_before === '') delete query.date_before
            if (query.date_after === '') delete query.date_after

            this.$router.push({
                query: {
                    ...query,
                },
            })
        }
    }
}
</script>

<template>
    <DatePicker
        :value="timeRange"
        format="dd/MM/yyyy"
        type="daterange"
        placement="bottom-end"
        placeholder="Bắt đầu - Kết thúc"
        style="width: 200px"
        @on-change="handleChangeTime"
    ></DatePicker>
</template>

<style scoped lang="less">

</style>
