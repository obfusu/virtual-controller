#include<libevdev/libevdev.h>
#include<libevdev/libevdev-uinput.h>

#include<string.h>
#include<fcntl.h>
#include<stdio.h>
#include<sys/ioctl.h>
#include<unistd.h>

#include "fakeDevice.h"

struct libevdev_uinput* initNewGamepadDev() {
  struct libevdev *dev = NULL;
  struct libevdev_uinput *uidev;

  dev = libevdev_new();
  // TODO: error check dev
  libevdev_set_name(dev, "Xbox Controller");
  libevdev_enable_event_type(dev, EV_KEY);
  libevdev_enable_event_type(dev, EV_ABS);
  
  /**
   * We'll support 4 buttons on left & 4 buttons on right
   * 
   * Left side - DPAD keys
   * Right side - Action keys
   * 
   * Start & Select buttons in the middle
   * 
   * right trigger + right trigger down
   * left trigger + left trigger down
   */
  libevdev_enable_event_code(dev, EV_KEY, BTN_DPAD_DOWN, NULL);
  libevdev_enable_event_code(dev, EV_KEY, BTN_DPAD_UP, NULL);
  libevdev_enable_event_code(dev, EV_KEY, BTN_DPAD_LEFT, NULL);
  libevdev_enable_event_code(dev, EV_KEY, BTN_DPAD_RIGHT, NULL);
  
  libevdev_enable_event_code(dev, EV_KEY, BTN_SOUTH, NULL);
  libevdev_enable_event_code(dev, EV_KEY, BTN_NORTH, NULL);
  libevdev_enable_event_code(dev, EV_KEY, BTN_WEST, NULL);
  libevdev_enable_event_code(dev, EV_KEY, BTN_EAST, NULL);

  libevdev_enable_event_code(dev, EV_KEY, BTN_START, NULL);
  libevdev_enable_event_code(dev, EV_KEY, BTN_SELECT, NULL);

  // libevdev_enable_event_code(dev, EV_KEY, BTN_TR, NULL);
  // libevdev_enable_event_code(dev, EV_KEY, BTN_TR2, NULL);

  // libevdev_enable_event_code(dev, EV_KEY, BTN_TL, NULL);
  // libevdev_enable_event_code(dev, EV_KEY, BTN_TL2, NULL);

  // libevdev_enable_event_code(dev, EV_ABS, ABS_X, NULL);
  // libevdev_enable_event_code(dev, EV_ABS, ABS_Y, NULL);
  // libevdev_enable_event_code(dev, EV_ABS, ABS_GAS, NULL);
  // libevdev_enable_event_code(dev, EV_ABS, ABS_BRAKE, NULL);

  // Create uinput from created dev
  int err = libevdev_uinput_create_from_device(dev, LIBEVDEV_UINPUT_OPEN_MANAGED, &uidev);
  if (err != 0) {
    printf("Error creating uinput device: %d\n", err);
    libevdev_uinput_destroy(uidev);
  }

  libevdev_free(dev);
  return uidev;
}

struct libevdev_uinput *uidev;

int init () {
  uidev = initNewGamepadDev();
  printf("inited gamepad\n");
  
  return 0;
}

int destroy () {
  printf("destroying device\n");
  libevdev_uinput_destroy(uidev);

  return 0;
}

unsigned int getKey(char x) {
  unsigned int key = 0;

  switch (x) {
    case 'w':
      key = BTN_DPAD_UP;
      break;
    
    case 's':
      key = BTN_DPAD_DOWN;
      break;

    case 'a':
      key = BTN_DPAD_LEFT;
      break;

    case 'd':
      key = BTN_DPAD_RIGHT;
      break;

    case 'i':
      key = BTN_NORTH;
      break;
    
    case 'k':
      key = BTN_SOUTH;
      break;

    case 'j':
      key = BTN_WEST;
      break;
    
    case 'l':
      key = BTN_EAST;
      break;
    
    case 'v':
      key = BTN_SELECT;
      break;
    
    case 'b':
      key = BTN_START;
      break;

    default:
      printf("unknown char %c", x);
  }

  return key;
}

int processKeySequence(char *seq) {
  int len = strlen(seq);
  printf("Length: %d\n", len);

  if (len % 2 != 0) {
    printf("error: expected even bytes");
    return -1;
  }

  int i;
  for (i = 0; i < len; i+=2) {
    unsigned int key = getKey(seq[i]);
    unsigned int value = seq[i+1] - '0';

    libevdev_uinput_write_event(uidev, EV_KEY, key, value);
    printf("key %d, value %d\n", key, value);
  }

  libevdev_uinput_write_event(uidev, EV_SYN, SYN_REPORT, 0);
  printf("--- SYN_REPORT ---\n\n");
}