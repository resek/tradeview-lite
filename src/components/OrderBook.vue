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
      <div
        id="table-body"
        class="scrollbar"
      >
        <transition name="order-book">
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
      default: null
    }
  },
  data () {
    return {
      asks: null,
      bids: null
    }
  },
  created () {
    this.getOrderBook()
  },
  methods: {
    async getOrderBook () {
      console.log('getOrderBook')
      try {
        const response = await axios.get(`/api/v2/order_book/${this.selectedPair}`)
        console.log('response', response)
        if (response?.data?.asks?.length > 0) this.asks = response.data.asks.slice(0, 100)
        if (response?.data?.bids?.length > 0) this.bids = response.data.bids.slice(0, 100)
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
@import '../styles/scrollbar.css';

#order-book {
  margin: 5px;
  color: #9598A2;
  max-width: 70%;
}

#header {
  background: #202124;
  padding: 7px 20px;
  border-radius: 3px 3px 0px 0px;
  font-size: 0.8rem;
}

#table {
  display: grid;
  grid-template-rows: auto;
}

#table-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 5px 0;
  background: #1D1D21;
  border-top: 1px solid #313337;
  border-bottom: 1px solid #313337;
  font-size: 0.8rem;
  color: #4B4D51;
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
  height: 200px;
  background: #18191B;
  border-radius: 0px 0px 3px 3px;
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
  color: #fa4141;
  justify-self: start;
  transition: 0.5s color;
}

#bid-col {
  color: green;
  transition: 0.5s color;
}

#bid-col:hover, #ask-col:hover {
  color: white;
  cursor: pointer
}

.order-book-enter-from,
.order-book-leave-to {
  opacity: 0;
}

.order-book-enter-active {
  transition: all 0.3s ease-in;
}

.order-book-enter-to,
.order-book-leave-from {
  opacity: 1;
}
</style>
