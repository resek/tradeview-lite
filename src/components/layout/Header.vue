<template>
  <header>
    <nav>
      <img
        src="@/assets/logo.svg"
        @click="goHomepage"
      >
      <span>Tradeview Lite</span>
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
  background-color: var(--background-secondary-color);
  display: grid;
  align-items: center;
}

header nav {
  width: 90%;
  margin: auto;
  font-size: 0.8rem;
  color: var(--text-dark-color);
  display: grid;
  align-items: center;
  grid-template-columns: max-content max-content;
  gap: 2.5vw
}

header nav img {
  width: 4.5rem;
  cursor: pointer;
}
</style>
