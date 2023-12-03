export default function ({ $axios, redirect, store }) {
    // $axios.setHeader('Content-Type', 'application/json', [
    //   'post'
    // ])

    $axios.setHeader('Content-Type', 'application/json')

    $axios.onRequest((config) => {
        const token = localStorage.getItem("access_token")
        if (token) {
            $axios.setToken(JSON.parse(token), 'Token')
        }

        console.log('Making request to: ' + config.url)
    })

    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            // redirect('/400')
        }
    })
}
