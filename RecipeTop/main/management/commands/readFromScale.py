import time
import channels.layers
import socket
from django.core.management.base import BaseCommand, CommandError
from asgiref.sync import async_to_sync

TCP_IP = '192.168.43.248'
TCP_PORT = 2050
BUFFER_SIZE = 1024

# State information
IDLE = 0
READING = 1

class Command(BaseCommand):
    help = "Reads scale over wifi and sends on Django Channel"

    def handle(self, *args, **options):

        self.channel_layer = channels.layers.get_channel_layer()
        self.group_name = 'scale_coms'
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            'worker_channel'
        )

        # Start server
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((TCP_IP, TCP_PORT))

        # Listen for one connection
        s.listen(1)

        con, addr = s.accept()
        print ('Connection address:', addr)

        state = IDLE

        while True:

            if state == IDLE:
                # Check for start
                if self.checkToggle():
                    # TODO: Send start to scale
                    state = READING
            else:
                # Check for end
                if self.checkToggle():
                    # TODO: Send stop to scale
                    state = IDLE
                    continue

                data = con.recv(BUFFER_SIZE)
                if not data:
                    continue

                self.stdout.write("Value: " + data.decode('utf-8'))
                async_to_sync(self.channel_layer.group_send)(
                    self.group_name,
                    {
                        'type': 'scale_message',
                        'message': data.decode('utf-8')
                    }
                )

    def checkToggle(self):
        try:
            # Keep reading while message queue not empty
            while(True):
                msg = async_to_sync(self.channel_layer.recieve)(
                    self.group_name
                )

                if msg['type'] == "toggle":
                    return True
        except:
            # Message queue was empty
            return False
