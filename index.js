var Service;
var Characteristic;

var sys = require('sys');
var dgram = require('dgram');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-udp-sender', 'Udp-Sender', UdpSenderAccessory);
}

function puts(error, stdout, stderr) {
   console.log(stdout)
}

function UdpSenderAccessory(log, config) {
  this.log     = log;
  this.service = 'Switch';

  this.name      = config['name'];
  this.ip        = config['ip'];
  this.port      = config['port'];
  this.on_msg    = config['on_msg'];
  this.off_msg   = config['off_msg'];
  this.state_msg = config['state_msg'];
  }

UdpSenderAccessory.prototype.setState = function(powerOn, callback) {
  var accessory = this;
  var ip        = this.ip;
  var port      = this.port;
  var message   = this.off_msg;

  if (powerOn == 1) {
    message = this.on_msg;
  }

  var client = dgram.createSocket("udp4");

  client.on('error', function(e) {
      throw e;
  });

  client.on("message", function (msg, rinfo) {
    // accessory.log("got: \t" + msg + "\t from\t" + rinfo.address + ":" + rinfo.port);
    client.close();
  });

  client.send(message, 0, message.length, port, ip, function(err, bytes) {});

  // accessory.log('Set ' + accessory.name + ' to ' + powerOn);
  callback(null);
}

UdpSenderAccessory.prototype.getState = function(callback) {
  var accessory = this;
  var ip        = this.ip;
  var port      = this.port;
  var message   = this.state_msg;

  var client = dgram.createSocket("udp4");

  client.on('error', function(e) {
      throw e;
  });

  client.on("message", function (msg, rinfo) {
    // accessory.log("got: \t" + msg + "\t from\t" + rinfo.address + ":" + rinfo.port);
    client.close();

    var cleanMsg = msg.toString();
    cleanMsg = cleanMsg.trim().toLowerCase();

    // accessory.log('State of ' + accessory.name + ' is: ' + cleanMsg);
    callback(null, cleanMsg == "1");

  });

  client.send(message, 0, message.length, port, ip, function(err, bytes) {});

}

UdpSenderAccessory.prototype.getServices = function() {
  var informationService = new Service.AccessoryInformation();
  var switchService = new Service.Switch(this.name);

  informationService
  .setCharacteristic(Characteristic.Manufacturer, 'UDP Client Manufacturer')
  .setCharacteristic(Characteristic.Model, 'UDP Client Model')
  .setCharacteristic(Characteristic.SerialNumber, 'UDP Client Serial Number');

  var characteristic = switchService.getCharacteristic(Characteristic.On)
  .on('set', this.setState.bind(this))
  .on('get', this.getState.bind(this));

  return [switchService];
}
