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
    <Input
      v-model="tradePrice"
      :placeholder="placeholder"
      :text="$store.state.currency"
    />
    <div
      id="main-button"
      :class="$store.state.buy ? 'buy-bg' : 'sell-bg'"
    >
      {{ $store.state.buy ? "Buy" : "Sell" }}
    </div>
  </div>
</template>

<script>
import Input from './ui/Input.vue'

export default {
  components: {
    Input
  },
  data () {
    return {
      buy: true,
      tradePrice: null
    }
  },
  computed: {
    placeholder () {
      return this.$store.state.buy ? 'If prices rises to' : 'If prices falls to'
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
  color: var(--price-color);
  width: 50%;
  align-self: center;
  justify-self: center;
  font-size: 1.2rem;
  padding: 0.4rem 0;
  text-align: center;
  border-radius: 3px;
  cursor: not-allowed
}

.buy-btn {
  color: var(--bid-color);
}

.sell-btn {
  color: var(--ask-color);
}

.buy-bg {
  background-color: var(--bid-color);
  transition: 0.4s;
}

.sell-bg {
  background-color: var(--ask-color);
  transition: 0.4s;
}
</style>
