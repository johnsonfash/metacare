const { networkInterfaces } = require('os');
const nets = networkInterfaces();

module.exports = (req, res, next) => {
  let ip = 'Not found';
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        ip = net.address;
        break;
      }
    }
  }
  req.ip_address = ip;
  next();
}