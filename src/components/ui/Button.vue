<template>
  <div
    id="main-button"
    :class="colorClass"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ['text', 'colorClass']
}
</script>

<style scoped>
#main-button {
  color: var(--price-color);
  font-size: 1.2rem;
  border-radius: 3px;
  height: 2.5rem;
  display: grid;
  place-items: center;
}
</style>
