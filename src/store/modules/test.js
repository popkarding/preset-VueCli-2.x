export default {
  state: {
    token: '',
  },
  mutations: {
    changeState(state, payload) {
      state.token = 'testcomittoken'
    },
  },
}
