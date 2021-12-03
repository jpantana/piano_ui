<template>
  <div id="nav">
      <router-link
        to="/major"
        class="link"
        :class="{ 'is-active': active === 1}"
        @click="handleLinkChange(1)"
      >
        Major
      </router-link> |
      <router-link
        to="/minor"
        class="link"
        :class="{ 'is-active': active === 2 }"
        @click="handleLinkChange(2)"
      >
        Minor
      </router-link>
  </div>

  <router-view />
</template>

<script>
import {ref} from 'vue';


export default {
  name: 'App',
  setup() {
    const active = ref(1);

    const handleLinkChange = (id) => {
      active.value = id;
    }

    return {
      active,
      handleLinkChange,
    }
  },
};
</script>


<style lang="scss">
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

.link {
  color: #484848;
  text-decoration: none;

  &.is-active {
    color: #2c2c9c;
    font-weight: 600;
    color: #2c2c9c;
    color: #2c2c9c;
    border-bottom: 1px solid #2c2c9c;
  }
}
</style>
