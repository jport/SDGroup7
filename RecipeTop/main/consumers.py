from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class ScaleConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = "scale_coms"

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    # Receive message from websocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'scale_message',
                'message': message
            }
        )

    def scale_message(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'message': message
        }))
