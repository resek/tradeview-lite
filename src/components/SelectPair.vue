<template>
  <div id="select-pair">
    <span>Price: {{ selectedPairPrices.last }}</span>
    <select v-model="selectedPair">
      <option
        v-for="pair in tradingPairs"
        :key="pair.url_symbol"
        :value="pair.url_symbol"
      >
        {{ pair.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    tradingPairs: {
      type: Array,
      default: null
    },
    selectedPairPrices: {
      type: Object,
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

<style scoped>
#select-pair {
  background-color: var(--background-secondary-color);
  border-radius: 3px;
  color: var(--bid-color)
}

</style>
