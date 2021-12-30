<template>
  <div id="select-pair">
    <div id="header">
      <transition name="animation">
        <div v-if="selectedPairPrices">
          <span id="pair-name">{{ addSlashSpace( selectedPair.name) }}</span>
          <span>{{ currency }} <span id="price">{{ formatedPrice }}</span></span>
        </div>
      </transition>
    </div>
    <Spinner v-if="!tradingPairs" />
    <transition name="animation">
      <div
        v-if="tradingPairs"
        id="pairs"
        class="scrollbar"
      >
        <div
          v-for="(pair, index) in tradingPairs"
          :key="pair.url_symbol"
          :class="{active: activeElement === index}"
          @click="selectPair(pair, index)"
        >
          {{ addSlashSpace(pair.name) }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      selectedPair: { url_symbol: 'btcusd', name: 'BTC/USD' },
      selectedPairPrices: null,
      tradingPairs: null,
      activeElement: 0
    }
  },
  computed: {
    formatedPrice () {
      return Number(this.selectedPairPrices.last).toLocaleString()
    },
    currency () {
      const currency = this.selectedPair.name.split('/').pop()
      this.$store.commit('updateCurrency', currency)
      return currency
    }
  },
  created () {
    this.getTradingPairs()
    this.getSelectedPairPrices()
  },
  methods: {
    async getSelectedPairPrices () {
      try {
        const response = await axios.get(`/api/v2/ticker/${this.selectedPair.url_symbol}/`)
        if (response?.data) {
          this.selectedPairPrices = response.data
        }
      } catch (e) {
        console.error('Failed to fetch', e)
      }
    },
    async getTradingPairs () {
      try {
        const response = await axios.get('/api/v2/trading-pairs-info/')
        if (response?.data?.length > 0) {
          this.tradingPairs = response.data
          this.selectedPair = response.data[0]
        }
      } catch (e) {
        console.error('Failed to fetch', e)
      }
    },
    addSlashSpace (name) {
      return name.replace('/', ' / ')
    },
    selectPair (pair, index) {
      this.selectedPair = pair
      this.activeElement = index
      this.selectedPairPrices = null
      this.getSelectedPairPrices()
      this.$store.commit('updateSelectedSymbol', this.selectedPair.url_symbol)
    }
  }
}
</script>

<style scoped>
#select-pair {
  background-color: var(--background-secondary-color);
  border-radius: 3px;
  display: grid;
  grid-template-rows: 2rem 1fr;
}

#header {
  background-color: var(--box-header-color);
  padding-left: 2vw;
  border-radius: 3px 3px 0px 0px;
  font-size: 0.9rem;
  color: var(--text-light-color);
  display: grid;
  align-items: center;
}

#header > div {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 2vw
}

#pair-name {
  color: var(--pairs-color);
  font-weight: bold;
}

#price {
  color: var(--price-color);
  font-weight: bold;
}

#pairs {
  overflow-y: scroll;
  color: var(--price-color);
}

#pairs > div {
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 0.8rem;
  padding-left: 2vw;
  border-bottom: 1px solid var(--border-color);
}

#pairs > div:hover {
  background: var(--background-hover-color);
}

.active {
  color: var(--pairs-color);
}

.spinner {
  align-self: center;
  transform: scale(0.7);
}
</style>
