#!/usr/bin/env python
# -*- coding: utf-8 -*-

import asyncio

import paho.mqtt.client as mqtt
import hashlib
import uuid
from datetime import datetime, timezone, timedelta
import json
import random
import math
import time

OPERATIONAL_STATES = ["navigating", "idle", "disabled", "offline", "charging",
  "waitingHumanEvent", "waitingExternalEvent", "waitingInternalEvent", "manualOverride"]

async def sendMessage(host, port, keepalive):
    mqtt_client = mqtt.Client()
    mqtt_client.connect(host, port, keepalive)
    mqtt_client.loop_start()

    # These could come from a configuration file or environment variables or any other source, but they are assumed not to change!
    identity = {"manufacturerName": "Mass Robotics AMR", "robotModel": "AMR-01", "robotSerialNumber": "0000001", "baseRobotEnvelope": {"x": 0.5, "y": 1}}

    # Generate a uuid that will be consistent for this robot
    m = hashlib.md5()
    seed = identity["manufacturerName"] + identity["robotSerialNumber"]
    m.update(seed.encode('utf-8'))
    uid = uuid.UUID(m.hexdigest())
    identity["uuid"] = str(uid)

    # Attach a timestamp
    identity["timestamp"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S%z")

    mqtt_client.publish("identityReport", json.dumps(identity))

    status = {"uuid": str(uid)}
    # status = {}
    while True:
      nowDt = datetime.now(timezone.utc)
      now = nowDt.timestamp()
      status["timestamp"] = nowDt.strftime("%Y-%m-%dT%H:%M:%S%z")

      # The following information would need to be pulled out in a vendor-specific way,
      # for this example it is just randomly generated
      
      # Get the current operational state and put it in the status message
      status["operationalState"] = random.choice(OPERATIONAL_STATES)

      # Generate a battery percentage that goes between 20 and 100
      status["batteryPercentage"] = 20 + now % 81
      
      # Pick a random velocity
      status["velocity"] = random.choice([
        # deviating 10 degrees to the left
        { "linear": 3, "angular": { "x": 0., "y": 0., "z": 0.087, "w": 0.996 } },
        # deviating 15 degrees to the right
        { "linear": 1, "angular": { "x": 0., "y": 0., "z": -0.131, "w": 0.991 } }
      ])

      # Generate a random location, simulating that the AMR moves in circles
      r = 20
      angle = random.choice([
        { "x": 0., "y": 0., "z": 0.087, "w": 0.996 },
        { "x": 0., "y": 0., "z": -0.131, "w": 0.991 }
      ])
      status["location"] = {"x":  math.cos(now) * r, "y": math.sin(now) * r, "z": 0, "angle": angle, "planarDatum": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"}

      # Generate random paths and destinations
      side = random.choice([10, 20, 30])
      status["path"] = [
        {"timestamp": (nowDt+timedelta(seconds=10)).strftime("%Y-%m-%dT%H:%M:%S%z"), "x": 0, "y": 0, "angle": { "x": 0., "y": 0., "z": 0., "w": 1 }, "planarDatumUUID": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"},
        {"timestamp": (nowDt+timedelta(seconds=20)).strftime("%Y-%m-%dT%H:%M:%S%z"), "x": 0, "y": side, "angle": { "x": 0., "y": 0., "z": 0., "w": 1 }, "planarDatumUUID": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"},
        {"timestamp": (nowDt+timedelta(seconds=30)).strftime("%Y-%m-%dT%H:%M:%S%z"), "x": side, "y": side, "angle": { "x": 0., "y": 0., "z": 0., "w": 1 }, "planarDatumUUID": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"},
        {"timestamp": (nowDt+timedelta(seconds=40)).strftime("%Y-%m-%dT%H:%M:%S%z"), "x": side, "y": 0, "angle": { "x": 0., "y": 0., "z": 0., "w": 1 }, "planarDatumUUID": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"},
        {"timestamp": (nowDt+timedelta(seconds=50)).strftime("%Y-%m-%dT%H:%M:%S%z"), "x": 0, "y": 0, "angle": { "x": 0., "y": 0., "z": 0., "w": 1 }, "planarDatumUUID": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"}
      ]
      status["destinations"] = [
        {"timestamp": (nowDt+timedelta(seconds=30)).strftime("%Y-%m-%dT%H:%M:%S%z"), "x": side, "y": side, "angle": { "x": 0., "y": 0., "z": 0., "w": 1 }, "planarDatumUUID": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"},
        {"timestamp": (nowDt+timedelta(seconds=50)).strftime("%Y-%m-%dT%H:%M:%S%z"), "x": 0, "y": 0, "angle": { "x": 0., "y": 0., "z": 0., "w": 1 }, "planarDatumUUID": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"}
      ]

      # Publish the report message
      mqtt_client.publish("statusReport", json.dumps(status))
      # mqtt_client.publish("identityReport", json.dumps(status))

      # Wait for 1 second
      time.sleep(1)

if __name__ == '__main__':
    host = "localhost"
    port = 1883
    keepalive = 60
    asyncio.get_event_loop().run_until_complete(sendMessage(host, port, keepalive))
