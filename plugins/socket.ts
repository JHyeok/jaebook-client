import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

const chatServerUrl = process.env.chatWebSocket

export default ({ store }) => {
  Vue.use(VueNativeSock, chatServerUrl, {
    format: 'json',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    connectManually: true,
    store
  })
}
