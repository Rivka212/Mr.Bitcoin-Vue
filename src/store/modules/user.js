import { userService } from "@/services/user.service"

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
      } catch (error) {
        console.error('Logout failed', error);
        throw error;
      }
    },
    async signup({ commit }, { username }) {
      try {
        const newUser = await userService.signup(username); 
        commit('setLoggedInUser', { user: newUser } );
      } catch (error) {
        console.error('Signup failed', error);
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