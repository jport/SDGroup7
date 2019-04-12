from django.core.management.base import BaseCommand, CommandError
import channels.layers
import socket
from main.models import ScaleFlag
from asgiref.sync import async_to_sync
import time

TCP_IP = '192.168.43.248'
TCP_PORT = 2050
BUFFER_SIZE = 1024

# State information
IDLE = 0
SETUP = 1
READING = 2
DESTORY = 3

class Command(BaseCommand):
    help = "Reads scale over wifi and sends on Django Channel"

    def handle(self, *args, **options):
        state = IDLE

        self.channel_layer = channels.layers.get_channel_layer()
        self.group_name = 'scale_coms'
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            'worker_channel'
        )

        # Start server 
        curSocket = None
        curConnection = None

        while True: # State machine
            print(state)
            nextState = None
            if state == SETUP:
                # Connect to scale
                curSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                curSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                curSocket.bind((TCP_IP, TCP_PORT))
                curSocket.listen(1)
                curConnection, addr = curSocket.accept()

                # Set state to READING
                nextState = READING

            elif state == READING:
                # Read from scale
                curConnection.settimeout(5.0)
                data = curConnection.recv(BUFFER_SIZE)

                if not data:
                    # Set state to DESTORY
                    nextState = DESTORY
                else:
                    decoded = data.decode('utf-8')
                    print("Value: " + decoded)

                    async_to_sync(self.channel_layer.group_send)(
                        self.group_name,
                        {
                            'type': 'scale_message',
                            'message': decoded
                        }
                    )

                    if(not self.checkFlag()):
                        nextState = DESTORY
                    else:
                        nextState = READING

            elif state == DESTORY:
                # Close connection if still open
                curConnection.shutdown(socket.SHUT_RDWR)
                curConnection.close()

                curSocket.shutdown(socket.SHUT_RDWR)
                curSocket.close()

                print("Sockets closed")

                # Set state to IDLE
                nextState = IDLE
                pass
            else: #IDLE
                if(self.checkFlag()):
                    # Set state to SETUP
                    nextState = SETUP
                else:
                    time.sleep(1)

                    # Set state to IDLE
                    nextState = IDLE

            state = nextState

    def checkFlag(self):
        flags = ScaleFlag.objects.all()
        if flags.count() < 1:
            return False

        return flags[0].enabled
