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
                <span id="bid-col">{{ bid[0] }}</span>
              </div>
            </div>
            <div id="asks">
              <div
                v-for="(ask, index) in asks"
                :key="index"
              >
                <span id="ask-col">{{ ask[0] }}</span>
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
  props: {
    selectedPair: {
      type: String,
      default: 'btcusd'
    }
  },
  data () {
    return {
      asks: null,
      bids: null
    }
  },
  watch: {
    selectedPair: function () {
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
        const response = await axios.get(`/api/v2/order_book/${this.selectedPair}`)
        if (response?.data?.asks?.length > 0) this.asks = response.data.asks.slice(0, 500)
        if (response?.data?.bids?.length > 0) this.bids = response.data.bids.slice(0, 500)
      } catch (e) {
        console.log('Failed to fetch', e)
      }
    },
    calculateValue (data) {
      const value = data[0] * data[1]
      return (Math.round(value * 100) / 100).toLocaleString()
    }
  }
}
</script>

<style scoped>
#order-book {
  color: var(--text-light-color);
  display: grid;
  grid-template-rows: auto 1fr;
  grid-column: 1 / 3;
}

#header {
  background-color: var(--box-header-color);
  padding: 7px 20px;
  border-radius: 3px 3px 0px 0px;
  font-size: 0.8rem;
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
  padding: 5px 0;
  background-color: var(--table-header-color);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  font-size: 0.8rem;
  color: var(--text-dark-color);;
}

#table-head > span {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: end;
}

#table-head > span:first-of-type {
  padding-right: 10px;
}

#table-head > span:last-of-type {
  padding-right: 20px;
  padding-left: 10px;
}

#table-ask-title {
  justify-self: start;
}

#table-body {
  overflow-y: scroll;
}

#table-body > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#bids > div, #asks > div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: end;
  padding: 3px 0px 3px 0;
}

#bids > div:hover, #asks > div:hover {
  background: rgba(84, 84, 84, 0.2);
  cursor: default;
}

#asks > div {
  padding-right: 15px;
  padding-left: 10px
}

#bids > div {
  padding-right: 10px;
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
  color: white;
  cursor: pointer
}

.spinner {
  transform: scale(0.7);
}
</style>
