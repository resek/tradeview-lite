<template>
  <select v-model="selectedPair">
    <option
      v-for="pair in tradingPairs"
      :key="pair.url_symbol"
      :value="pair.url_symbol"
    >
      {{ pair.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    tradingPairs: {
      type: Array,
      default: null
    }
  },
  emits: ['update-selected-pair'],
  data () {
    return {
      selectedPair: 'btcusd'
    }
  },
  watch: {
    selectedPair () {
      this.$emit('update-selected-pair', this.selectedPair)
    }
  }

}
</script>

<style>

</style>