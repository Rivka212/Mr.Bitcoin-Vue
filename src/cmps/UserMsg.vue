<script>
import { eventBus } from '@/services/eventBus.service';

export default {
  data() {
    return {
        msg:null,
    };
  }, 
   methods: {
    onUserMsg(msg){
this.msg = msg   
setTimeout(()=> this.msg=null,2000)
 }
  },
  created(){
    eventBus.on('user-msg', this.onUserMsg)
  },

  components: {
  },
};
</script>

<template>
    <div v-if="msg" :class="msg.type" class="user-msg">
    <p>{{ msg.txt }}</p>
    </div>
</template>

<style scoped>
.user-msg{
    position: absolute;
    top:50px ;
    right: 1rem;
    min-width: 200px;
    padding: 10px;
    border-radius: 5px;
   
    color: rgb(224, 211, 211);
}

.success {
    color: black;
     background-color: rgb(247, 205, 116);
}

.error {
    background-color: rgb(4, 48, 17);
}
</style>