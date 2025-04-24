<template>
  <header>
    <h1>Mr Bitcoin</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/stats">Chart</RouterLink>
      <section v-if="loggedInUser">
			<h3>Hello {{ capitalizedUserName }}!</h3>
			<button class="capitalize button" @click="onLogout">Logout</button>
		</section>
    </nav>
  </header>
</template>

<script>

export default {
  
  data() {
    return {
      username: '',
      // loggedInUser:'',
    }},
  methods: {
    async onLogout() {
      try {
        await this.$store.dispatch('logout')
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    },

computed: {
  loggedInUser() {    
            return this.$store.getters.loggedInUser
        
    },
    capitalizedUserName() {
    if (this.loggedInUser && this.loggedInUser.name) {
      const name = this.loggedInUser.name;
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    return '';
  }
}
}
</script>

<style scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgb(114, 190, 118);
}

a{
  margin-inline-start: 10px;
  font-size: 20px;

}

a:hover{
	cursor: pointer;
  color: rgb(142, 220, 179);
}
.router-link-exact-active{
  color: rgb(193, 241, 195);

}
</style>
