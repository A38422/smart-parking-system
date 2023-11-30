export default function (context) {
    if (!context.store.getters.accessToken) context.redirect('/login')

    try {
        const accessToken = JSON.parse(localStorage.getItem('access_token'))

        if (!accessToken) context.redirect('/login')
    } catch (e) {
        context.redirect('/login')
    }
}
