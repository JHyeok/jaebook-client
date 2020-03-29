import Vue from 'vue'
// import io from 'socket.io-client'
import io from 'socket.io-client/dist/socket.io.slim.js'
import VueSocketIOExt from 'vue-socket.io-extended'

const chatServerUrl = process.env.CHAT_SERVER_URL || 'http://localhost:4000'

const socket = io(chatServerUrl, {
  autoConnect: false
})

Vue.use(VueSocketIOExt, socket)
