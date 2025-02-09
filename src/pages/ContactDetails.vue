<template>
    <section v-if="contact" class="contact-details">
        <!-- <h1>Contact Details: </h1> -->
        <h2>{{ contact.name }}</h2>
        <h4>Phone: {{ contact.phone }}</h4>
        <h4>Email: {{ contact.email }}</h4>
        <RouterLink to="/contact"><button>Back</button></RouterLink>
    </section>
</template>

<script>
import { contactService } from '@/services/contact.service'
export default {
    data() {
        return {
            contact: null
        }
    },
    async created() {
        const { id: contactId } = this.$route.params
        this.contact = await contactService.get(contactId)
    }
}
</script>

<style scoped>
.contact-details {
    display: grid;
    gap: 10px;
    padding: 40px;
    margin: 50px;
    background-color: rgb(194, 249, 213);
}

h2,
h4 {
    color: rgb(8, 59, 24);
    padding: 10px;
}

button {
    border-radius: 5px;
    padding: 10px;
    border: none;
    background-color: rgb(62, 191, 103);
    ;
}

a {
    justify-self: end;
}
</style>