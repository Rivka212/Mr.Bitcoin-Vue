<script>
import {contactService} from '@/services/contact.service.js'
import ContactsList from '@/cmps/ContactList.vue'

export default{
    data(){
        return{
            contacts: null,
        }
    },
    async created(){
        this.contacts = await contactService.query()
    },
    components:{
        ContactsList,

    }
}
</script>

<template>
<h2>Contacts</h2>   
  <ContactsList v-if="contacts" :contacts="contacts"/>
</template>

<style scoped>
h2{
    padding: 20px;
}
</style>
