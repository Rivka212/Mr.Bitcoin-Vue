<template>
    <section class="contact-list">
        <ul>
            <li v-for="contact in contacts">
                <ContactsPreview :contact="contact" />
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
    components: {
        ContactsPreview,
    }
}
</script>

<style scoped>
ul {}

li {
    width: 180px;
    list-style: none;
    background-color: rgb(172, 244, 182);
    padding: 5px;
    margin: 10px;
}
</style>