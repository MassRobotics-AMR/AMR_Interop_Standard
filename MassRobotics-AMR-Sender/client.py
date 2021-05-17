#!/usr/bin/env python

import asyncio
import websockets
import json
import time
import uuid
import hashlib
from datetime import datetime

async def sendMessage():
  uri = "ws://localhost:3000"
  async with websockets.connect(uri) as websocket:
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
    
    # Send the identity message once
    await websocket.send(json.dumps(identity))

    status = {"uuid": str(uid)}
    while True:
      status["timestamp"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S%z")

      # The following information would need to be pulled out in a vendor-specific way, for this example it is just hard-coded
      # Get the current operational state and put it in the status message
      status["operationalState"] = "navigating" 

      # Get the current location and put it in the status message
      status["location"] = {"x": 0.5, "y": 1, "z": 0, "angle": {"w": 0.924, "x": 0.000, "y": 0.000, "z": 0.383}, "planarDatum": "4B8302DA-21AD-401F-AF45-1DFD956B80B5"}

      # Send the report message
      await websocket.send(json.dumps(status))

      # Wait for 1 second
      time.sleep(1)

asyncio.get_event_loop().run_until_complete(sendMessage())
