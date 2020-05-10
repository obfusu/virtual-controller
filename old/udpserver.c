#include <sys/socket.h>
#include <netinet/ip.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <netinet/udp.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#include "fakeDevice.h"

int main()
{
  init();

  int sockfd;
  char buf[100];
  char quitStr[5] = {'e', 'x', 'i', 't', 0};

  sockfd = socket(AF_INET, SOCK_DGRAM, 0);
  if (sockfd < 0) {
    printf("Error creating socket %d\n", sockfd);
  }

  // struct sockaddr addr;
  socklen_t addrlen;

  struct sockaddr_in addr, sa;
  sa.sin_family = AF_INET;
  sa.sin_port = htons(24242);
  sa.sin_addr.s_addr = INADDR_ANY;

  int status;
  status = bind(sockfd, (const struct sockaddr*)&sa, sizeof(sa));
  if (status != 0) {
    printf("Error binding socket %d\n", status);
  }
  else {
    printf("bound on socket 24242");
  }

  while (1) {
    int r = recvfrom(sockfd, buf, 100, 0, (struct sockaddr*)&addr, &addrlen);
    buf[r] = 0;
    printf("recieved bytes: %d, data:%s\n", r, buf);
    
    // int len = strlen(buf);
    // keypress(buf[0]);

    if (buf[0] == 'q') {
      destroy();
      break;
    }

    if (buf[0] == 'h') {
      printf("TODO: send ok to sockaddr");
    }

    processKeySequence(buf);
  }

  return 0;
}