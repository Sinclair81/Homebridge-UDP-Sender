Homebridge-UDP-Sender
=====================

Send UDP packets e.g. to an ESP32 to control relays.

## Installation
(Requires node >=6.0.0)

1. Install homebridge using: `sudo npm install -g --unsafe-perm homebridge`
2. Install homebridge-config-ui-x using: `sudo npm install -g --unsafe-perm homebridge-config-ui-x`
3. Update your configuration file with this guide: https://smartapfel.de/homebridge/plugins-installieren/
4. Install homebridge-udp-sender using: homebridge-config-ui-x's Webserver
5. Update your configuration file with code like the sample below

Homebridge-UDP-Sender configuration parameters

Name | Value | Required | Notes
-------------- | ------------- | -------- | -------------------------------------
`accessory` | "Udp-Sender" | yes | Must be set to "Udp-Sender" and is required.
`name` | (custom) | yes | Name of accessory that will appear in homekit app and is required.
`ip` | "10.0.0.6" | yes | Must be set to the IP of your UDP Client and is required.
`on_msg` | "R11" | yes | Must be set to the message to turn something on and is required.
`off_msg` | "R10" | yes | Must be set to the message to turn something off and is required
`state_msg` | "R1?" | yes | Must be set to the message to get the state of something and is required.

## Configuration

```
"accessories": [
    {
      "accessory": "Udp-Sender",
      "name": "Light 1",
      "ip": "10.0.0.6",
      "port": "5000",
      "on_msg": "R11",
      "off_msg": "R10",
      "state_msg": "R1?"
    },
    {
      "accessory": "Udp-Sender",
      "name": "LED Tree",
      "ip": "10.0.0.6",
      "port": "5000",
      "on_msg": "R71",
      "off_msg": "R70",
      "state_msg": "R7?"
   }
 ]
```
