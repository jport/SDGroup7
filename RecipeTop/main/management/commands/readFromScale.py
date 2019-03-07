import time
import channels.layers
import socket
from django.core.management.base import BaseCommand, CommandError
from asgiref.sync import async_to_sync

TCP_IP = '192.168.43.177'
TCP_PORT = 2050
BUFFER_SIZE = 1024

class Command(BaseCommand):
    help = "Reads scale over wifi and sends on Django Channel"

    def handle(self, *args, **options):

        value = 0;
        channel_layer = channels.layers.get_channel_layer()
        group_name = 'scale_coms'
        async_to_sync(channel_layer.group_add)(
            group_name,
            'worker_channel'
        )

        # Start server
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((TCP_IP, TCP_PORT))

        # Listen for one connection
        s.listen(1)

        con, addr = s.accept()
        print ('Connection address:', addr)

        while True:
            #print ("before")
            data = con.recv(BUFFER_SIZE)
            #print("hi")
            if not data: break

            self.stdout.write("Value: " + data.decode('utf-8'))
            async_to_sync(channel_layer.group_send)(
                group_name,
                {
                    'type': 'scale_message',
                    'message': data.decode('utf-8')
                }
            )
