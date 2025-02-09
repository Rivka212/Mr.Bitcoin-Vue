<template>
    <section class="contact-edit">
    <form v-if="contact" @submit="onSave" class="form-edit">
        <input v-model="contact.name" type="text">
        <input v-model="contact.email" type="email">
        <button>Save</button>
    </form>
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
    methods: {
        async onSave() {
            await contactService.save(this.contact)
            this.$router.push('/contact')
        }
    },
    async created() {
        const { id: contactId } = this.$route.params
        this.contact = await contactService.get(contactId)
    }
}
</script>

<style scoped>
.contact-edit{
display: flex;
justify-content: center;
  align-items: center;
  height: 60vh;
  margin: 0;
}

.form-edit{
    display: grid;
    grid-template-columns: 1fr;
    width: 300px;
    color: rgb(29, 32, 29);
    background-color: rgb(129, 217, 141);
    padding: 20px;
    border: 5px solid rgb(159, 241, 181);
}

input{
    height: 30px;
    margin: 10px;
    padding: 10px;
}

button {
    height: 30px;
    margin: 10px;
    width: 230px;
    border-radius: 5px;
    border: none;
    box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.4);
    background-color: rgb(193, 242, 200);
}
</style>