<script>
import { contactService } from '@/services/contact.service.js'
import ContactsList from '@/cmps/ContactList.vue'

export default {
    data() {
        return {
            contacts: null,
        }
    },
    async created() {
        this.contacts = await contactService.query()
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
           
        }
    },
    components: {
        ContactsList,

    }
}
</script>

<template>
    <h2>Contacts</h2>
    <ContactsList @remove="removeContact" v-if="contacts" :contacts="contacts" />
</template>

<style scoped>
h2 {
    padding: 20px;
}
</style>
