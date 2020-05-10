Architecture
-------------

Bottom to top:
=============

Virtual Driver (C)

UDP Server (C)

http server (node)

client (android)

Protocol
client will keep sending key strokes when updated
http server will keep collecting keys and for every 1 ms, and send final key state with SYN_REPORT

For EV_KEY, values 0 mean key is not pressed, and 1 means key is pressed.
Sometimes, value 2 is reported for repeated key press (for keyboard this value is emitted when u keep pressing the key without lifting up)



------------------------------

Input driver version is 1.0.1
Input device ID: bus 0x0 vendor 0x0 product 0x0 version 0x0
Input device name: "Xbox Gamepad (userspace driver)"
Supported events:
  Event type 0 (EV_SYN)
  Event type 1 (EV_KEY)
    Event code 304 (BTN_SOUTH)
    Event code 305 (BTN_EAST)
    Event code 307 (BTN_NORTH)
    Event code 308 (BTN_WEST)
    Event code 310 (BTN_TL)
    Event code 311 (BTN_TR)
    Event code 314 (BTN_SELECT)
    Event code 315 (BTN_START)
    Event code 316 (BTN_MODE)
    Event code 317 (BTN_THUMBL)
    Event code 318 (BTN_THUMBR)
  Event type 3 (EV_ABS)
    Event code 0 (ABS_X)
      Value      0
      Min   -32768
      Max    32767
    Event code 1 (ABS_Y)
      Value      0
      Min   -32768
      Max    32767
    Event code 3 (ABS_RX)
      Value      0
      Min   -32768
      Max    32767
    Event code 4 (ABS_RY)
      Value      0
      Min   -32768
      Max    32767
    Event code 9 (ABS_GAS)
      Value      0
      Min        0
      Max      255
    Event code 10 (ABS_BRAKE)
      Value      0
      Min        0
      Max      255
    Event code 16 (ABS_HAT0X)
      Value      0
      Min       -1
      Max        1
    Event code 17 (ABS_HAT0Y)
      Value      0
      Min       -1
      Max        1
