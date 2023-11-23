export const educations = [
    {
        label: 'Không có',
        value: 'none',
    },
    {
        label: 'Tiểu học',
        value: 'elementary',
    },
    {
        label: 'Trung học cơ sở',
        value: 'middle_school',
    },
    {
        label: 'Trung học phổ thông',
        value: 'high_school',
    },
    {
        label: 'Cao đẳng',
        value: 'college',
    },
    {
        label: 'Đại học',
        value: 'university',
    },
    {
        label: 'Kỹ sư',
        value: 'engineer',
    },
    {
        label: 'Tiến sĩ',
        value: 'doctorate',
    },
    {
        label: 'Thạc sĩ',
        value: 'master',
    },
]

export const roles = [
    {
        label: 'Thành viên',
        value: 'member',
    },
    {
        label: 'Hội đồng gia tộc',
        value: 'admin',
    },
]

export const years = () => {
    const currentYear = new Date().getFullYear()

    const temp = []

    const startYear = currentYear
    const endYear = currentYear + 30

    for (let i = startYear; i <= endYear; i++) {
        temp.push({
            value: i,
            label: i.toString(),
        })
    }

    return temp
}
