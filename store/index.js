import Vuex from 'vuex'
import { getters, mutations, state } from './auth.js'

const createStore = () => {
    return new Vuex.Store({
        state: {
            ...state,
        },
        getters: {
            ...getters,
        },
        mutations: {
            ...mutations,
        },
        actions: {},
    })
}

export default createStore
