export const state = () => ({
    accessToken: null,
    accessExp: null,
    user: null,
})

// GET access_token
try {
    state.accessToken = JSON.parse(localStorage.getItem('access_token'))
} catch (e) {
    state.accessToken = null
}

// GET user
try {
    state.user = JSON.parse(localStorage.getItem('user'))
} catch (e) {
    state.user = null
}

// GET access_exp
try {
    state.accessExp = JSON.parse(localStorage.getItem('access_exp'))
    const now = new Date().getTime()
    if (now > new Date(state.accessExp).getTime()) {
        state.accessToken = null
        localStorage.removeItem('access_token')
        state.refreshToken = null
        localStorage.removeItem('access_exp')
        state.user = null
        localStorage.removeItem('user')
    }
} catch (e) {
    state.accessExp = null
}

export const getters = {
    accessToken(state) {
        return state.accessToken
    },
    accessExp(state) {
        return state.accessToken
    },
    user(state) {
        return state.user
    },
}

export const mutations = {
    SET_ACCESS_TOKEN(state, payload) {
        state.accessToken = payload
        localStorage.setItem('access_token', JSON.stringify(payload))
    },
    DELETE_ACCESS_TOKEN(state) {
        state.accessToken = null
        localStorage.removeItem('access_token')
    },
    SET_ACCESS_EXP(state, payload) {
        state.accessExp = payload
        localStorage.setItem('access_exp', JSON.stringify(payload))
    },
    DELETE_ACCESS_EXP(state) {
        state.accessExp = null
        localStorage.removeItem('access_exp')
    },
    SET_USER(state, payload) {
        localStorage.setItem('user', JSON.stringify(payload))
        state.user = payload
    },
    DELETE_USER(state) {
        localStorage.removeItem('user')
        state.user = null
    },
}
