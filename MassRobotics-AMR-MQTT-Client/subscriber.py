#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import json
from jsonschema import validate, ValidationError

host = "localhost"
port = 1883
keepalive = 60

with open('./AMR_Interop_Standard.json') as file_obj:
    json_schema = json.load(file_obj)

def on_message(mqttc, obj, msg):
    print(msg.topic)
    json_dict = json.loads(msg.payload)
    try:
        validate(json_dict, json_schema)
        print(json_dict)
    except ValidationError as e:
        print(e.message)

mqtt_client = mqtt.Client()
mqtt_client.on_message = on_message
mqtt_client.connect(host, port, keepalive)

mqtt_client.subscribe("identityReport")
mqtt_client.subscribe("statusReport")

mqtt_client.loop_forever()
