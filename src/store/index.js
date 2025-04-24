import { createApp } from 'vue'
import { createStore } from 'vuex'
import contact from './modules/contact'
import user from './modules/user'

const storeOptions = {
    strict: true,
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
    },
    modules: {
        contact,
        user,
    }
}

const store = createStore(storeOptions)
export default store

