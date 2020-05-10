const dgram = require('dgram')
const client = dgram.createSocket('udp4')

async function sendCommand(data) {
  client.send(data, 24242, 'localhost', err => {
    if (err) {
      console.log('error: ' + err)
    } else {
      console.log('sent '+ data)
    }
  })
}

async function closeSocket() {
  if (client)
    client.close()
}

module.exports = {
  sendCommand,
  closeSocket
}