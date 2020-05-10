const WebSocket = require('ws')
const gp = require('./gamepadClient')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    gp.sendCommand(message)
  })
  ws.send('ho!')
})
