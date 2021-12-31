<template>
  <div id="input-container">
    <input
      :placeholder="placeholder"
      type="text"
      autocomplete="off"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: ['text', 'placeholder', 'modelValue'],
  emits: ['update:modelValue']
}
</script>

<style scoped>
#input-container {
  height: max-content;
  border: 1px solid var(--input-border-color);
  border-radius: 3px;
  display: grid;
  grid-template-columns: auto max-content;
}

#input-container > span {
  padding-right: 1vw;
  color: var(--text-dark-color);
  align-self: center;
}

input {
  color: var(--price-color);
  height: 2.5rem;
  display: inline;
  border: none;
  background-color: var(--background-secondary-color);
  padding-left: 1vw;
  font-size: 1rem;
  width: 100%
}

#input-container:focus-within {
  border: 1px solid var(--input-outline-color);
}

input:focus {
  outline: none;
}

input::placeholder {
  color: var(--text-dark-color);
  font-style: italic;
}
</style>
