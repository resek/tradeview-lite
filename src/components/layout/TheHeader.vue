<template>
  <header>
    <nav>
      <img
        src="@/assets/logo.svg"
        @click="goHomepage"
      >
      <span>Tradeview</span>
    </nav>
  </header>
</template>

<script>

export default {
  methods: {
    goHomepage () {
      window.location.href = 'https://www.bitstamp.net/'
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 3rem;
  background-color: #18191B;
  display: grid;
  align-items: center;
}

header nav {
  width: 90%;
  margin: auto;
  font-size: 0.8rem;
  color: #58595c;
  display: grid;
  align-items: center;
  grid-template-columns: min-content min-content;
  gap: 1.5rem
}

header nav img {
  width: 4.5rem;
  cursor: pointer;
}
</style>
