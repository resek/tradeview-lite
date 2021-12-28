<template>
  <div id="tradeview">
    <SelectPair
      @update-selected-pair-symbol="updateSelectedPairSymbol"
    />
    <BuySell />
    <OrderBook :selected-pair-symbol="selectedPairSymbol" />
  </div>
</template>

<script>
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
      selectedPairSymbol: 'btcusd'
    }
  },
  methods: {
    updateSelectedPairSymbol (symbol) {
      this.selectedPairSymbol = symbol
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
  margin-top: 0.5rem;
  gap: 0.5rem;
  height: calc(100vh - 4.5rem);
}

@media (min-width: 1800px) {
  #tradeview {
    width: 60%
  }
}

@media (max-width: 1100px) {
  #tradeview {
    width: 95%;
  }
}
</style>
