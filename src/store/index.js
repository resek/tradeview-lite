import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedSymbol: 'btcusd',
    buy: true,
    tradePrice: null,
    currency: null
  },
  mutations: {
    toggleBuy (state, payload) {
      state.buy = payload.buy
      if (payload.tradePrice) state.tradePrice = payload.tradePrice
    },
    updateSelectedSymbol (state, symbol) {
      state.selectedSymbol = symbol
    },
    updateCurrency (state, currency) {
      state.currency = currency
    }
  }
})
