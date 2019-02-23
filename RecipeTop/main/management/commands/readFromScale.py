import time
import channels.layers
from django.core.management.base import BaseCommand, CommandError
from asgiref.sync import async_to_sync

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

        while True:
            self.stdout.write("Value: " + str(value))
            async_to_sync(channel_layer.group_send)(
                group_name,
                {
                    'type': 'scale_message',
                    'message': str(value)
                }
            )

            value += 1

            time.sleep(.5);
