<script>
import { contactService } from '@/services/contact.service.js'
import ContactsList from '@/cmps/ContactList.vue'
import ContactFilter from '@/cmps/ContactFilter.vue'

export default {
    data() {
        return {
            contacts: null,
        }
    },
  
    methods: {
        async removeContact(contactId) {
            try {
             await contactService.remove(contactId)
            const idx = this.contacts.find(contact => contact._id === contactId)
            this.contacts.splice(idx, 1)    
            } catch (error) {
                alert('Something went wrong')
            } 
        },
       async filterBy(filterBy){
            await this.loadContacts(filterBy)
        },
        async loadContacts(filterBy={}){
            this.contacts = await contactService.query(filterBy)
        },
    },
        async created() {
        this.loadContacts
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
