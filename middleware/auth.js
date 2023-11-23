export default function (context) {
    if (!context.store.getters.accessToken) context.redirect('/login')

    try {
        const accessToken = JSON.parse(localStorage.getItem('access_token'))
        const refreshToken = JSON.parse(localStorage.getItem('refresh_token'))

        if (!accessToken || !refreshToken) context.redirect('/login')
    } catch (e) {
        context.redirect('/login')
    }
}
