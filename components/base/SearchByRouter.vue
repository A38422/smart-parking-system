<script>
    export default {
        name: "SearchByRouter",

        data() {
            return {
                searchValue: '',
            }
        },

        created() {
            if (this.$route.query && this.$route.query.search) {
                this.searchValue = this.$route.query.search
            }
        },

        methods: {
            handleSearch() {
                const query = {
                    ...this.$route.query,
                    search: this.searchValue,
                }

                if (query.page) delete query.page
                if (query.search === '') delete query.search

                this.$router.push({
                    query: {
                        ...query,
                    },
                })
            },
        }
    }
</script>

<template>
    <Input
        v-model="searchValue"
        search
        clearable
        placeholder="Tìm kiếm"
        class="input-search"
        @on-clear="handleSearch"
        @on-search="handleSearch"
    />
</template>

<style scoped lang="less">

</style>
