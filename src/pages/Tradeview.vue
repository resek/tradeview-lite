<template>
  <div>
    <Spinner v-if="!(tradingPairs && selectedPairData)" />
    <template v-else>
      <select v-model="selectedPair">
        <option
          v-for="pair in tradingPairs"
          :key="pair.url_symbol"
          :value="pair.url_symbol"
        >
          {{ pair.name }}
        </option>
      </select>
      <span>Price: {{ selectedPairData.last }}</span>
      <OrderBook :selected-pair="selectedPair" />
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import OrderBook from '../components/OrderBook'

export default {
  components: {
    OrderBook
  },
  data () {
    return {
      tradingPairs: null,
      selectedPair: 'btcusd',
      selectedPairData: null
    }
  },
  watch: {
    selectedPair () {
      this.selectedPairData = null
      this.getCurrencyPair()
    }
  },
  created () {
    this.getTradingPairs()
    this.getCurrencyPair()
  },
  methods: {
    async getCurrencyPair () {
      try {
        const response = await axios.get(`/api/v2/ticker/${this.selectedPair}/`)
        if (response?.data) {
          this.selectedPairData = response.data
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
