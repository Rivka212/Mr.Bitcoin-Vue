<script>
import AppHeader from './cmps/AppHeader.vue'
import AppFooter from './cmps/AppFooter.vue'

export default{
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style >


</style>
