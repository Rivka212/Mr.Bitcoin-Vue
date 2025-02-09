<template>
  <article class="contact-preview">
 <h3>{{ contact.name }}</h3>
 <!-- <h3>{{ contact.email }}</h3> -->
  </article>
    </template>
    
    <script>
    export default {
        props: {
            contact: {
                type: Object,
                required: true,
            }
        },

    }
    </script>
   
    <style scoped>
 .contact-preview{
        display: flex;
        /* justify-content: center; */
        padding: 10px;
        background-color: rgb(129, 217, 141);
       
    
    }

    </style>