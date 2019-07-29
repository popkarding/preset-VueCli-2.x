export default {
  state: {
    token: 'my token',
  },
  mutations: {
    changeState (state, payload) {
      state.token = 'payload.test'
    },
  },
}
