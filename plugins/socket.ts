import Vue from 'vue'
// import io from 'socket.io-client'
import io from 'socket.io-client/dist/socket.io.slim.js'
import VueSocketIOExt from 'vue-socket.io-extended'

const socket = io('http://localhost:4000', {
  autoConnect: false
})

Vue.use(VueSocketIOExt, socket)
