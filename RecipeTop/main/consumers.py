from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from main.models import ScaleFlag
import json

class ScaleConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = "scale_coms"

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        flags = ScaleFlag.objects.all()
        if flags.count() >= 1:
            flag = flags[0]
            flag.enabled = True
            flag.save()

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

        flags = ScaleFlag.objects.all()
        if flags.count() >= 1:
            flag = flags[0]
            flag.enabled = False
            flag.save()

    # Receive message from websocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Do nothing with message from websocket

    def scale_message(self, event):
        message = event['message']

        # Send value of scale to front end
        self.send(text_data=json.dumps({
            'message': message
        }))
