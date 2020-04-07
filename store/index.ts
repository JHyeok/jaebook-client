/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
export const state = () => ({
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false
  }
})

export const mutations = {
  SOCKET_ONOPEN (state, event) {
    console.log('✅ Socket open')
    ;(this as any).$socket = event.currentTarget
    state.socket.isConnected = true
  },
  SOCKET_ONCLOSE (state, event) {
    console.log('❌ Socket close')
    state.socket.isConnected = false
  },
  SOCKET_ONERROR (state, event) {
    console.log('❌ 🔥🔥🔥 Socket error')
    console.error(state, event)
  },
  SOCKET_ONMESSAGE (state, message) {
    state.socket.message = message
    console.log('✅ message received: ' + message.data)
  },
  SOCKET_RECONNECT (state, count) {
    console.log('✅ Socket reconnect')
    console.info(state, count)
  },
  SOCKET_RECONNECT_ERROR (state) {
    console.log('❌ 🔥🔥🔥 Socket reconnect error')
    state.socket.reconnectError = true
  }
}

export const actions = {
  message (context, message) {
    console.log('✅ Socket message action')
  },
  messages (context, messages) {
    console.log('✅ Socket messages action')
  }
}
