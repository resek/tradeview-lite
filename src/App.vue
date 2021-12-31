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

@media (max-width: 650px) {
  html {
    font-size: 14px;
  }
}

@media (min-width: 1599px) {
  html {
    font-size: 18px;
  }
}
</style>
