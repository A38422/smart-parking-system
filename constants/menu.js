const menu = [
    {
        key: '0',
        title: 'Trang chủ',
        icon: 'md-home',
        styleIcon: '',
        path: '/',
    },
    {
        key: '1',
        title: 'Cây gia phả',
        icon: 'ios-git-network',
        styleIcon: '',
        children: [
            {
                key: '1-1',
                title: 'Cây',
                path: '/cay-gia-pha/cay',
            },
            {
                key: '1-2',
                title: 'Danh sách',
                path: '/cay-gia-pha/danh-sach',
            },
        ],
    },
    {
        key: '2',
        title: 'Tài chính',
        icon: 'logo-usd',
        styleIcon: '',
        children: [
            {
                key: '2-1',
                title: 'Thu',
                path: '/tai-chinh/thu',
            },
            {
                key: '2-2',
                title: 'Chi',
                path: '/tai-chinh/chi',
            },
            {
                key: '2-3',
                title: 'Báo cáo',
                path: '/tai-chinh/bao-cao',
            },
        ],
    },
    {
        key: '3',
        title: 'Sự kiện',
        icon: 'md-calendar',
        styleIcon: {},
        path: '/su-kien',
    },
    {
        key: '4',
        title: 'Quản lý tài khoản',
        icon: 'ios-people',
        styleIcon: {},
        path: '/quan-ly-tai-khoan',
        isAdmin: true,
    },
]
export default menu
