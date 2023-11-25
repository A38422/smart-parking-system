<template>
    <Breadcrumb>
        <BreadcrumbItem v-for="(item, index) in crumbs" :key="index">
            <NuxtLink
                v-if="item.title + '' !== ''"
                :to="!item.disabled ? item.to : '#'"
                class="title"
            >
                {{ item.title }}
            </NuxtLink>
        </BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
import breadCrumb from '@/constants/breadCrumb'

export default {
    computed: {
        crumbs() {
            const pathArray = this.$route.path.split('/')
            pathArray.shift()
            const breadcrumbs = pathArray.reduce(
                (breadcrumbArray, path, idx) => {
                    if (
                        breadcrumbArray[idx - 1] &&
                        breadcrumbArray[idx - 1].to
                    ) {
                        if (breadcrumbArray[idx - 1].to === '/') {
                            breadcrumbArray.push({
                                to: '/' + path,
                                disabled: this.getBreadCrumb(path)
                                    ? this.getBreadCrumb(path).disabled
                                    : true,
                                title: this.getBreadCrumb(path)
                                    ? this.getBreadCrumb(path).title + ''
                                    : '',
                            })
                        } else {
                            breadcrumbArray.push({
                                to: breadcrumbArray[idx - 1].to + '/' + path,
                                disabled: this.getBreadCrumb(path)
                                    ? this.getBreadCrumb(path).disabled
                                    : true,
                                title: this.getBreadCrumb(path)
                                    ? this.getBreadCrumb(path).title + ''
                                    : '',
                            })
                        }
                    } else {
                        breadcrumbArray.push({
                            to: '/' + path,
                            disabled: this.getBreadCrumb(path)
                                ? this.getBreadCrumb(path).disabled
                                : true,
                            title: this.getBreadCrumb(path)
                                ? this.getBreadCrumb(path).title + ''
                                : '',
                        })
                    }
                    return breadcrumbArray
                },
                [],
            )
            return breadcrumbs.filter((x) => x.title + '' !== '')
        },
    },

    methods: {
        getBreadCrumb(path) {
            if (breadCrumb[path + this.$route.params.code])
                return breadCrumb[path + this.$route.params.code]
            if (!breadCrumb[path]) {
                const key = Object.keys(this.$route.params).find(
                    (key) => this.$route.params[key] === path,
                )
                return breadCrumb[key]
            }
            return breadCrumb[path]
        },
    },
}
</script>
