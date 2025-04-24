<script>
import router from '@/router';
import { contactService } from '@/services/contact.service';
import { userService } from '@/services/user.service';
import contact from '@/store/modules/contact';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {

  data() {
    return {
      username: '',
    };
  },

  methods: {
  async onSignup() {
    // if (this.username) {
    //         alert("You are already logged in!");
    //         return;
    //     }
    const username = this.username
    
    try {
      await this.$store.dispatch('signup', { username: this.username });
 
    } catch (error) {
      console.error('Signup failed:', error);
    }
  },
  async logoutUser() {
    try {
      await this.$store.dispatch('clearLoggedInUser');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
},
computed: {
  loggedInUser() {
            return this.$store.getters.loggedInUser
        }
    },
};
</script>

<template>
    <section class="signup-form" v-if="!loggedInUser">
        <img class="bitcoinlogo" src="/src/assets/imgs/bitcoinlogo.png" alt="">
        	<h3>Please sign up</h3>
	<form @submit.prevent="onSignup">
		<input v-model="username" type="text" name="userName" placeholder="Enter username"/>
    <button type="submit">Signup</button>

	</form>
    </section>
</template>

<style scoped>
.signup-form{
  margin: 60px;
  padding: 20px;
  background-color: rgb(144, 224, 162);
  max-width: 460px;
  height: 450px;
}
h3{
  margin-bottom: 10px;
  color:rgb(35, 57, 37)
  }
input, button{
    height: 30px;
    border: none;
}
button{
    border: 1px solid rgb(177, 160, 26);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2); 
    background-color: rgb(250, 217, 70);
}
img{
  height: 40px;
  margin-left: 10px;
  padding: 19px;
}
.bitcoinlogo{
  height: 260px;
}
</style>