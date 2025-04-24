import { userService } from "@/services/user.service"
import { showErrorMsg, showSuccessMsg } from '@/services/eventBus.service'
import { capitalize } from "@/services/util.service"

export default {
    state() {
        return {
            loggedInUser: null,
        }
    },
    mutations: {
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user
        },
        clearLoggedInUser(state) {
            state.loggedInUser = null;
          },
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser;
          },
        //   isUserLoggedIn(state) {
        //     return !!state.loggedInUser;
        // }
    },
    actions: {
    async logout({ commit }) {
      try {
        await userService.logout()
        commit('clearLoggedInUser');
        showSuccessMsg('Logged out successfully 👋')
      } catch (error) {
        console.error('Logout failed', error);
        showErrorMsg('Something went wrong 😢')
        throw error;
      }
    },
    async signup({ commit }, { username }) {
      try {
        const newUser = await userService.signup(username); 
        commit('setLoggedInUser', { user: newUser } );
        showSuccessMsg(`Welcome, ${capitalize(username)}! 🎉`)
      } catch (error) {
        console.error('Signup failed', error);
        showErrorMsg('Something went wrong 😢')
        throw error;
      }
    },
    loadLoggedInUser({ commit }) {
      try {
        const user = userService.getLoggedInUser()
        if (user) commit('setLoggedInUser', { user })
      } catch (error) {
        console.error('No logged-in user found')
      }
    }
  }
}