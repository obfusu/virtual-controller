import sys
import asyncio
import websockets

keyMap = {
  'w': 'BTN_DPAD_UP',
  'a': 'BTN_DPAD_LEFT',
  's': 'BTN_DPAD_DOWN',
  'd': 'BTN_DPAD_RIGHT',
  'i': 'BTN_NORTH',
  'j': 'BTN_WEST',
  'k': 'BTN_SOUTH',
  'l': 'BTN_EAST',
  'v': 'BTN_SELECT',
  'b': 'BTN_START'
}

def processKeySequence(data):
  l = len(data)
  if l % 2 != 0:
    print("error: expected even bytes")
    return -1
  events = []
  for i in range(0, len(data), 2):
    key = keyMap.get(data[i])
    value = ord(data[i+1]) - 48
    print(key, value)
    # append events
    # inp = InputEvent(key, value)
    # events.append(inp)

  # events.append(InputEvent(libevdev.EV_SYN.SYN_REPORT, 0))
  # gdev.send_events(events)
  print("-- SYN --")

async def server(websocket, path):
  client = websocket.remote_address
  print("client connected: " + client[0])
  while True:
    data = await websocket.recv()
    print(data)
    processKeySequence(data)

    if (data == 'q'):
      await websocket.send("bye bye")
      return

def main():
  try:
    start_server = websockets.serve(server, "0.0.0.0", 8080)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
  except KeyboardInterrupt:
    sys.exit(0)

main()