const express = require('express');
const ping = require('node-icmp-traceroute');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
// https://stackoverflow.com/questions/22381783/traceroute-why-my-packets-travel-around-the-world

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/traceroute', (req, res) => {
  const { ipToTraceroute } = req.query;

  ping.createSession().traceRoute('google.com', (err, data) => {
    if (err) {
      if (err.name === 'DNSError') throw err;
    } else {
      console.log(
        '[Inside app] data.latitude = ',
        data.latitude,
        ' data.longitude = ',
        data.longitude,
        ' data.source = ',
        data.source,
        ' data.target = ',
        data.target,
        ' status = ',
        data.status,
      );
    }
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
