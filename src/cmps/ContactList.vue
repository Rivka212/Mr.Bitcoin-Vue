<template>
    <section class="contact-list">
        <ul>
            <li v-for="contact in contacts" :key="contact._id">
                <ContactsPreview :contact="contact" />
                <button @click="onRemoveContact(contact._id)">x</button>
            </li>
        </ul>
    </section>
</template>

<script>
import ContactsPreview from './ContactsPreview.vue'
export default {
    props: {
        contacts: {
            type: Array,
            required: true,
        }
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('remove', contactId)
        }

    },
    components: {
        ContactsPreview,
    }
}
</script>

<style scoped>
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 230px;
    list-style: none;
    color: rgb(29, 32, 29);
    /* background-color: rgb(172, 244, 182); */
    background-color: rgb(129, 217, 141);
    padding: 5px;
    margin: 10px;
}

button {
    height: 30px;
    width: 25px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.4);
    background-color: rgb(193, 242, 200);

}
</style>