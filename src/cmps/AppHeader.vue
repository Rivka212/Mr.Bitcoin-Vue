<template>
  <header>
    <h1>Mr Bitcoin</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<script>
export default {}
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
  color: rgb(202, 237, 204);

}
</style>
