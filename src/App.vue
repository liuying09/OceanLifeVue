<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/test">Test</router-link>|
    <router-link to="/paginate">paginate</router-link>|
    <router-link to="/testTwo">testTwo</router-link>|
    <router-link to="/imageShow">imageShow</router-link>|
    <router-link to="/ArticleEdit">ArticleEdit</router-link>|
    <router-link to="/addProduct">addProduct</router-link>|
    <router-link to="/ProductEdit">ProductEdit</router-link>|
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
