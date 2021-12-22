<template>
  <div id="order-book">
    <div id="header">
      ORDER BOOK
    </div>
    <div id="table">
      <div id="table-head">
        <span>Sum</span>
        <span>Value</span>
        <span>Amount</span>
        <span class="bid">Bid</span>
        <span class="ask">Ask</span>
        <span>Amount</span>
        <span>Value</span>
        <span>Sum</span>
      </div>
      <div
        id="table-body"
        class="scrollbar"
      >
        <div id="bids">
          <div
            v-for="(bid, index) in bids"
            :key="index"
          >
            <span>0.54</span>
            <span>{{ calculateValue(bid) }}</span>
            <span>{{ bid[1] }}</span>
            <span
              id="bid"
              class="bid"
            >{{ bid[0] }}</span>
          </div>
        </div>
        <div id="asks">
          <div
            v-for="(ask, index) in asks"
            :key="index"
          >
            <span
              id="ask"
              class="ask"
            >{{ ask[0] }}</span>
            <span>{{ ask[1] }}</span>
            <span>{{ calculateValue(ask) }}</span>
            <span>0.42</span>
          </div>
        </div>
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
  grid-template-columns: repeat(8, 1fr);
  justify-items: end;
  padding: 5px 20px 5px 0;
  background: #1D1D21;
  border-top: 1px solid #313337;
  border-bottom: 1px solid #313337;
  font-size: 0.8rem;
  color: #4B4D51;
}

#table-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 200px;
  overflow-y: scroll;
  padding-right: 15px;
  background: #18191B;
  border-radius: 0px 0px 3px 3px;
}

#bids div, #asks div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: end;
}

.ask {
  justify-self: left;
  padding-left: 10px;
}

#ask {
  color: red
}

.bid {
  padding-right: 10px;
}

#bid {
  color: green
}
</style>
