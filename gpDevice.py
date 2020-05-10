import sys
import libevdev
from libevdev import InputEvent
import asyncio
import websockets

gdev = None

def createDevice():
  global gdev
  dev = libevdev.Device()
  dev.name = 'Xbox Jugaad Controller'
  dev.enable(libevdev.EV_KEY.BTN_SOUTH)
  try:
    gdev = dev.create_uinput_device()
    print("New device at {} ({})".format(gdev.devnode, gdev.syspath))

  except e:
    print("error in createDevice()", sys.exc_info()[0])

keyMap = {
  'w': libevdev.EV_KEY.BTN_DPAD_UP,
  'a': libevdev.EV_KEY.BTN_DPAD_LEFT,
  's': libevdev.EV_KEY.BTN_DPAD_DOWN,
  'd': libevdev.EV_KEY.BTN_DPAD_RIGHT,
  'i': libevdev.EV_KEY.BTN_NORTH,
  'j': libevdev.EV_KEY.BTN_WEST,
  'k': libevdev.EV_KEY.BTN_SOUTH,
  'l': libevdev.EV_KEY.BTN_EAST,
  'v': libevdev.EV_KEY.BTN_SELECT,
  'b': libevdev.EV_KEY.BTN_START
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
    inp = InputEvent(key, value)
    events.append(inp)

  events.append(InputEvent(libevdev.EV_SYN.SYN_REPORT, 0))
  gdev.send_events(events)
  print("-- SYN --")

async def server(websocket, path):
  while True:
    data = await websocket.recv()
    print(data)
    processKeySequence(data)

    if (data == 'q'):
      await websocket.send("bye bye")
      return

def main():
  try:
    createDevice()
    start_server = websockets.serve(server, "0.0.0.0", 8080)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
  except KeyboardInterrupt:
    sys.exit(0)

main()