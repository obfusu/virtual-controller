let ws = null

async function connect (uri) {
  ws = new WebSocket(uri)
  console.log('connecting to ' + uri)

  ws.onclose = (e) => {
    console.log('closed')
    console.error(e)
    ws = null
  }

  ws.onerror = (e) => {
    console.error('error ')
    console.dir(e, {depth: null})
    ws.close()
    ws = null
  }

  ws.onopen = () => {
    console.log('connected to ' + uri)
  }
}

async function close () {
  if (ws) {
    ws.close()
    ws = null
  }
}

async function send (data) {
  if (!ws) throw Error('connection null')
  await ws.send(data)
}

module.exports = {
  connect,
  close,
  send
}
