<template>
    <input v-model="filterBy.txt" @input="onFilterBy"
    type="text" placeholder="Search">
</template>

<script>
import { debounce } from '@/services/util.service';

export default {
   data() {
    return{
        filterBy:{txt:'',}
    }
    },
    methods: {
        setFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    },
    computed:{
onFilterBy(){
    return debounce(this.setFilterBy,1000)
}
    }
}
</script>

<style scoped>
input{
    width: 150px;
    padding: 5px;
}
 </style>