<template>
  <Header />
  <router-view />
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  components: {
    Header
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
