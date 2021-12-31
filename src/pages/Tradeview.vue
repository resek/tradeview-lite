<template>
  <div id="tradeview">
    <SelectPair />
    <BuySell />
    <OrderBook />
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
  }
}
</script>

<style scoped>
#tradeview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40% 60%;
  width: 75%;
  margin: auto;
  margin-top: 0.5rem;
  gap: 0.5vw;
  height: calc(100vh - 4.5rem);
}

@media (min-width: 1650px) {
  #tradeview {
    width: 50%
  }
}

@media (max-width: 1000px) {
  #tradeview {
    width: 98%;
  }
}
</style>
