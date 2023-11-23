<template>
    <Modal
        v-model="visible"
        title="Danh sách thành viên tham gia"
        width="400"
        class-name="vertical-center-modal"
    >
        <div class="list-detail-attendees">
            <List>
                <ListItem v-for="item in attendees" :key="item">
                    <ListItemMeta
                        v-if="findById(item)"
                        :avatar="
                            findById(item).img ||
                            'https://i.imgur.com/WzMrY0n.png'
                        "
                        :title="findById(item).name"
                    />
                    <template slot="action">
                        <li>
                            <NuxtLink
                                :to="`/cay-gia-pha/danh-sach?search=${
                                    findById(item).name
                                }`"
                                target="_blank"
                            >
                                Thông tin chi tiết
                            </NuxtLink>
                        </li>
                    </template>
                </ListItem>
            </List>
        </div>
        <template #footer>
            <div class="footer-modal-create-member">
                <Button @click="handleClose">Đóng</Button>
            </div>
        </template>
    </Modal>
</template>

<script>
export default {
    name: 'DetailAttendeesModal',

    props: {
        familyTree: {
            type: Array,
            default() {
                return []
            },
        },
    },

    data() {
        return {
            visible: false,
            attendees: [],
        }
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

        findById(id) {
            return id && this.familyTree.find((item) => item.id === id)
                ? this.familyTree.find((item) => item.id === id)
                : false
        },

        setData(data) {
            this.attendees = data
        },
    },
}
</script>
<style lang="less">
.list-detail-attendees {
    max-height: 500px;
    overflow-y: auto;
}
</style>
