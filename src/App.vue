<script>
import AppHeader from './cmps/AppHeader.vue'
import AppFooter from './cmps/AppFooter.vue'
import UserMsg from './cmps/UserMsg.vue';

export default{
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
  }
}
</script>

<template>
  <UserMsg/>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style >


</style>
