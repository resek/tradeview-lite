<template>
  <div id="page">
    <Spinner v-if="!(tradingPairs && selectedPairPrices)" />
    <div
      v-else
      id="tradeview"
    >
      <SelectPair
        :trading-pairs="tradingPairs"
        :selected-pair-prices="selectedPairPrices"
        @update-selected-pair="updateSelectedPair"
      />
      <BuySell />
      <OrderBook :selected-pair="selectedPair" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import OrderBook from '../components/OrderBook'
import BuySell from '../components/BuySell'
import SelectPair from '../components/SelectPair'

export default {
  components: {
    OrderBook,
    BuySell,
    SelectPair
  },
  data () {
    return {
      tradingPairs: null,
      selectedPair: 'btcusd',
      selectedPairPrices: null
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
    },
    updateSelectedPair (pair) {
      this.selectedPair = pair
      this.getSelectedPairPrices()
    }
  }
}
</script>

<style scoped>
#page {
  display: grid;
  height: calc(100vh - 3rem);
}

#tradeview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40% 60%;
  width: 80%;
  margin: auto;
  margin-top: 0.5rem;
  gap: 0.5rem;
  height: calc(100vh - 4.5rem);
}

.spinner {
  align-self: center;
}

@media (min-width: 1800px) {
  #tradeview {
    width: 60%
  }
}

@media (max-width: 1100px) {
  #tradeview {
    width: 95%
  }
}
</style>
