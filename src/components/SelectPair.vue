<template>
  <div id="select-pair">
    <Spinner v-if="loading" />
    <transition name="animation">
      <div v-if="!loading">
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
    </transition>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  emits: ['update-selected-pair'],
  data () {
    return {
      selectedPair: 'btcusd',
      selectedPairPrices: null,
      tradingPairs: null
    }
  },
  computed: {
    loading () {
      return !(this.tradingPairs && this.selectedPairPrices)
    }
  },
  watch: {
    selectedPair () {
      this.getSelectedPairPrices()
      this.$emit('update-selected-pair', this.selectedPair)
    }
  },
  created () {
    this.getTradingPairs()
    this.getSelectedPairPrices()
  },
  methods: {
    async getSelectedPairPrices () {
      try {
        const response = await axios.get(`/api/v2/ticker/${this.selectedPair}/`)
        if (response?.data) {
          this.selectedPairPrices = response.data
        }
      } catch (e) {
        console.log('Failed to fetch', e)
      }
    },
    async getTradingPairs () {
      try {
        const response = await axios.get('/api/v2/trading-pairs-info/')
        if (response?.data?.length > 0) {
          this.tradingPairs = response.data
        }
      } catch (e) {
        console.log('Failed to fetch', e)
      }
    }
  }
}
</script>

<style scoped>
#select-pair {
  background-color: var(--background-secondary-color);
  border-radius: 3px;
  color: var(--bid-color);
  display: grid
}

.spinner {
  align-self: center;
  transform: scale(0.7);
}
</style>
