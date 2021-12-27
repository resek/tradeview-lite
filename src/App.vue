<template>
  <TheHeader />
  <router-view />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>

<style>
@import './styles/custom.css';

* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
  background: var(--background-color);

}

#app {
  height: 100vh
}
</style>
