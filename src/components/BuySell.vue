<template>
  <div id="buy-sell">
    <div id="header">
      <span>NEW ORDER</span>
      <span id="header-buttons">
        <span
          :class="{'buy-btn': $store.state.buy}"
          @click="toggleBuy(true)"
        >Buy</span>
        <span
          :class="{'sell-btn': !$store.state.buy}"
          @click="toggleBuy(false)"
        >Sell</span>
      </span>
    </div>
    <input
      v-model="tradePrice"
      :placeholder="$store.state.buy ? 'Buy' : 'Sell'"
    >
    <div
      id="main-button"
      :class="$store.state.buy ? 'buy-bg' : 'sell-bg'"
    >
      {{ $store.state.buy ? "Buy" : "Sell" }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buy: true,
      tradePrice: null
    }
  },
  watch: {
    '$store.state.tradePrice': function () {
      this.tradePrice = this.$store.state.tradePrice
    }
  },
  methods: {
    toggleBuy (buy) {
      this.$store.commit('toggleBuy', { buy })
    }
  }
}
</script>

<style scoped>
#buy-sell {
  background-color: var(--background-secondary-color);
  border-radius: 3px;
  display: grid;
  grid-template-rows: 2rem 1fr 1fr;
}

#header {
  background-color: var(--box-header-color);
  padding: 0 2vw;
  border-radius: 3px 3px 0px 0px;
  font-size: 0.8rem;
  color: var(--text-light-color);
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
}

#header-buttons {
  justify-self: end;
}

#header-buttons span:first-child {
  margin-right: 1vw
}

#header-buttons > span {
  cursor: pointer;
  transition: 0.2s color;
}

#header-buttons > span:hover:not(.buy-btn, .sell-btn) {
  color: var(--price-color)
}

#main-button {
  width: 60%;
  align-self: center;
  justify-self: center;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  text-align: center;
  border-radius: 10px;
  cursor: not-allowed
}

input {
  height: 30px;
  width: 200px;
  align-self: center;
  justify-self: center;
}

.buy-btn {
  color: var(--bid-color);
}

.sell-btn {
  color: var(--ask-color);
}

.buy-bg {
  background-color: var(--bid-color);
}

.sell-bg {
  background-color: var(--ask-color);;
}
</style>
