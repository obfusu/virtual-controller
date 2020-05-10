const dgram = require('dgram')
const client = dgram.createSocket('udp4')

const KEY_MAP = {
  BTN_DPAD_DOWN: 's',
  BTN_DPAD_UP: 'w',
  BTN_DPAD_LEFT: 'a',
  BTN_DPAD_RIGHT: 'd'
}

/**
 * Our protocol
 * 
 * key1, key1 value, key2, key2 value, ...
 * Even number of bytes
 * 
 * eg.
 * s0w1
 */

const da = 'k1'
const da2 = 'k0'
let flag = true

const repeatSendEvent = setInterval(function() {
  let msg = flag? da: da2
  flag = !flag

  client.send(msg, 24242, 'localhost', err => {
    if (err) {
      console.error(err)
    } else {
      console.log(`sent : ${msg}`)
    }
  })
}, 1000)

process.on('SIGINT', function() {
  console.log('exiting')
  clearInterval(repeatSendEvent)
  client.send('q', 24242, 'localhost', err => {
    client.close()
  })
})