<script >
import { bitcoinService } from "@/services/bitcoin.service";
import {userService} from "@/services/user.service"

export default {
    data() {
        return {
            user: null,
            BTC:null,
        }
    },
    methods: {
    async loadUser() {       
        try{
            this.BTC = (await bitcoinService.getRate(this.user.balance)).toFixed(2)
           } catch (error) {
                console.log('Cannot load BTC');
        }
    },   
}, 
        async created() {
            this.user = await userService.getUser()
            if (this.user) {
            this.loadUser();
        }
    },
    }
</script>

<template>
  <section v-if="user" class="home-page">
    <img class="bitcoinlogo" src="/src/assets/imgs/bitcoinlogo.png" alt="">
<h2> {{ user.name }}</h2><div>
<img src="/src/assets/imgs/coins.png" alt="">
<h3>Coins: ${{ user.balance }}</h3></div>
<div>
<img src="/src/assets/imgs/bitcoin.png" alt="">
<h3 v-if="this.BTC">BTC: ${{ this.BTC }}</h3></div>
<section v-if="user.transactions && user.transactions.length">
 <h3>Transactions:</h3>
<ul>
  <li v-for="(transaction,index) in user.transactions" :key="index">
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
  height: 280px;
  margin:20px;
}
</style>
