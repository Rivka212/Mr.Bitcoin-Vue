<script>
import { contactService } from '@/services/contact.service.js'
import ContactsList from '@/cmps/ContactList.vue'
import ContactFilter from '@/cmps/ContactFilter.vue'
import { showErrorMsg, showSuccessMsg } from '@/services/eventBus.service';

export default {

      methods: {
        async removeContact(contactId) {
            try {
             await this.$store.dispatch({type:'removeContact', contactId})
        showSuccessMsg(`Removed contact ${contactId}`)    
        } catch (error) {
                showErrorMsg(`Couldn't remove contact`)
            } 
        },
       async filterBy(filterBy){
            await this.loadContacts(filterBy)
        },
        async loadContacts(filterBy={}){
            this.$store.dispatch({type:'loadContacts',filterBy})
        },
    },
    computed:{
        contacts(){
            return this.$store.getters.contacts
        },
    },
        async created() {
        this.loadContacts()
    },
    components: {
        ContactsList,
        ContactFilter,
    }
}
</script>

<template>
    <section class="header">
    <h2>Contacts</h2>
     <ContactFilter @filter="filterBy"/>
    <RouterLink :to="`/contact/edit/`"><button>Add a Contact</button></RouterLink>
</section>
    <ContactsList @remove="removeContact" v-if="contacts" :contacts="contacts" />
</template>

<style scoped>

.header{
display: flex;
justify-content: center;
align-items: center;
background-color: rgb(141, 247, 185);
margin: 30px;
padding: 20px;
}

h2 {
  margin-inline-end: 50px;
}

button{
    background-color: rgb(98, 185, 120);
    color: rgb(244, 246, 245);
    padding: 5px;
}
</style>
