<template>
  <div id="order-book">
    <div id="header">
      ORDER BOOK
    </div>
    <div id="table">
      <div id="table-head">
        <span>
          <span>Sum</span>
          <span>Value</span>
          <span>Amount</span>
          <span>Bid</span>
        </span>
        <span>
          <span id="table-ask-title">Ask</span>
          <span>Amount</span>
          <span>Value</span>
          <span>Sum</span>
        </span>
      </div>
      <Spinner v-if="!(asks && bids)" />
      <div
        id="table-body"
        class="scrollbar"
      >
        <transition name="animation">
          <div v-if="asks && bids">
            <div id="bids">
              <div
                v-for="(bid, index) in bids"
                :key="index"
              >
                <span>0.54</span>
                <span>{{ calculateValue(bid) }}</span>
                <span>{{ bid[1] }}</span>
                <span
                  id="bid-col"
                  @click="toggleBuy(true, bid[0])"
                >{{ bid[0] }}</span>
              </div>
            </div>
            <div id="asks">
              <div
                v-for="(ask, index) in asks"
                :key="index"
              >
                <span
                  id="ask-col"
                  @click="toggleBuy(false, ask[0])"
                >{{ ask[0] }}</span>
                <span>{{ ask[1] }}</span>
                <span>{{ calculateValue(ask) }}</span>
                <span>0.42</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      asks: null,
      bids: null
    }
  },
  watch: {
    '$store.state.selectedSymbol': function () {
      this.asks = null
      this.bids = null
      this.getOrderBook()
    }
  },
  created () {
    this.getOrderBook()
  },
  methods: {
    async getOrderBook () {
      try {
        const response = await axios.get(`/api/v2/order_book/${this.$store.state.selectedSymbol}`)
        if (response?.data?.asks?.length > 0) this.asks = response.data.asks.slice(0, 500)
        if (response?.data?.bids?.length > 0) this.bids = response.data.bids.slice(0, 500)
      } catch (e) {
        console.error('Failed to fetch', e)
      }
    },
    calculateValue (data) {
      const value = data[0] * data[1]
      return (Math.round(value * 100) / 100).toLocaleString()
    },
    toggleBuy (buy, tradePrice) {
      this.$store.commit('toggleBuy', { buy, tradePrice })
    }
  }
}
</script>

<style scoped>
#order-book {
  color: var(--text-light-color);
  display: grid;
  grid-template-rows: 2rem 1fr;
  grid-column: 1 / 3;
  font-size: 0.8rem;
}

#header {
  background-color: var(--box-header-color);
  padding-left: 2vw;
  border-radius: 3px 3px 0px 0px;
  display: grid;
  align-items: center;
}

#table {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 0;
  background: var(--background-secondary-color);
  border-radius: 0px 0px 3px 3px;
}

#table-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.4rem 0;
  background-color: var(--table-header-color);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-dark-color);
}

#table-head > span:first-of-type {
  grid-template-columns: 15% 25% 1fr max-content;
  display: grid;
  gap: 1vw;
  padding: 0 1.5vw;
}

#table-head > span:last-of-type {
  padding: 0 1.5vw;
  grid-template-columns: max-content 1fr 25% 15%;
  display: grid;
  justify-items: end;
  gap: 1vw
}

#table-ask-title {
  justify-self: start;
}

#table-body {
  overflow-y: scroll;
  font-size: 0.9rem;
}

#table-body > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#bids > div {
  display: grid;
  grid-template-columns: 15% 25% 1fr max-content;
  gap: 1vw;
  padding: 0.2rem 1.5vw;
}

#asks > div {
  display: grid;
  grid-template-columns: max-content 1fr 25% 15%;
  justify-items: end;
  padding: 0.2rem 1.2vw 0.2rem 1.5vw;
  gap: 1vw
}

#bids > div:hover, #asks > div:hover {
  background: var(--background-hover-color);
  cursor: default;
}

#ask-col {
  color: var(--ask-color);
  justify-self: start;
  transition: 0.5s color;
}

#bid-col {
  color: var(--bid-color);
  transition: 0.5s color;
}

#bid-col:hover, #ask-col:hover {
  color: var(--price-color);
  cursor: pointer
}

.spinner {
  transform: scale(0.7);
}

@media (max-width: 560px) {
  #table-body {
  font-size: 0.7rem;
  }
}

@media (max-width: 450px) {
  #table-body {
  font-size: 0.6rem;
  }
}
</style>
