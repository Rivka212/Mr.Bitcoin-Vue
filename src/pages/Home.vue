<script >
import { bitcoinService } from "@/services/bitcoin.service";
import {userService} from "@/services/user.service"
import Signup from "./signup.vue";

export default {
    data() {
        return {
            // user: null,
            BTC:null,
        }
    },
    methods: {
    async loadUser() {       
        try{
            this.BTC = (await bitcoinService.getRate(this.loggedInUser.coins)).toFixed(3)
           } catch (error) {
                console.log('Cannot load BTC')
        }
    },   
}, 
computed: {
  loggedInUser() {
            return this.$store.getters.loggedInUser
        }
    },
    user() {
      return this.loggedInUser;
    },
    watch: {
    loggedInUser(newUser) {
      if (newUser) {
        this.loadUser(); 
      }
    },
  },
        async created() {
        if (this.loggedInUser) {
            this.loadUser();
        }
    },
    created() {
  this.$store.dispatch('loadLoggedInUser')
},

    components: {
      Signup,
    },
    }
</script>

<template>
  <section>
<Signup v-if="!loggedInUser" />
  </section>
  <section v-if="loggedInUser" class="home-page">
    <img class="bitcoinlogo" src="/src/assets/imgs/bitcoinlogo.png" alt="">
<h2> {{ loggedInUser.name }}</h2><div>
<img src="/src/assets/imgs/coins.png" alt="">
<h3>Balance: ${{ loggedInUser.coins }}</h3></div>
<div>
<img src="/src/assets/imgs/bitcoin.png" alt="">
<h3 v-if="this.BTC">BTC: {{ BTC }}</h3></div>
<section v-if="loggedInUser.transactions && loggedInUser.transactions.length">
 <h3>Transactions:</h3>
<ul>
  <li v-for="(transaction,index) in loggedInUser.transactions" :key="index">
    {{ transaction }}
  </li>
</ul>
</section>
<h3 v-else >No Transactions</h3>
</section>
</template>

<style scoped>
.home-page{
  margin: 60px;
  padding: 20px;
  background-color: rgb(144, 224, 162);
  max-width: 460px;
  height: 450px;
}
h2,h3{
  margin: 5px;
  }
  div{
    display:flex;
  align-items: center;
}

img{
  height: 40px;
  margin-left: 10px;
  padding: 5px;
}
.bitcoinlogo{
  height: 260px;
  /* margin:20px; */
}
</style>
