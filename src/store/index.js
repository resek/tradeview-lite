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
      if (payload.buy !== undefined) state.buy = payload.buy
      if (payload.tradePrice !== undefined) state.tradePrice = payload.tradePrice
    },
    updateSelectedSymbol (state, symbol) {
      state.selectedSymbol = symbol
    },
    updateCurrency (state, currency) {
      state.currency = currency
    }
  }
})
