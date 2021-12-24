<template>
  <Spinner v-if="!fetchedData" />
  <div
    v-if="fetchedData"
    id="tradeview"
  >
    <div id="price-select">
      <span>Price: {{ selectedPairPrices.last }}</span>
      <SelectPairs
        :trading-pairs="tradingPairs"
        @update-selected-pair="updateSelectedPair"
      />
    </div>
    <BuySell />
    <OrderBook :selected-pair="selectedPair" />
  </div>
</template>

<script>
import axios from 'axios'
import OrderBook from '../components/OrderBook'
import BuySell from '../components/BuySell'
import SelectPairs from '../components/SelectPairs'

export default {
  components: {
    OrderBook,
    BuySell,
    SelectPairs
  },
  data () {
    return {
      tradingPairs: null,
      selectedPair: 'btcusd',
      selectedPairPrices: null
    }
  },
  computed: {
    fetchedData () {
      return this.tradingPairs && this.selectedPairPrices
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
#tradeview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40% 60%;
  width: 80%;
  margin: auto;
  height: calc(100vh - 3rem);
}

#order-book {
  grid-column: 1 / 3;
}

#price-select {
  justify-self: center;
  align-self: center;
}

#price-select > span {
  margin-right: 2rem;
  color: blue;
}

@media (min-width: 1800px) {
  #tradeview {
    width: 60%
  }
}

@media (max-width: 1200px) {
  #tradeview {
    width: 95%
  }
}
</style>
