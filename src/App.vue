<template>
  <div id="nav">
      <router-link to="/major">Major</router-link> |
      <router-link to="/minor">Minor</router-link>
  </div>

  <router-view />
</template>

<script>
export default {
  name: 'App',
};
</script>


<style>
/* body {
  width: 100vw;
  height: 100vh;
} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: inherit;
  width: inherit;
}
</style>
