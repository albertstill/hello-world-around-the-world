const express = require('express');
const ping = require('node-icmp-traceroute');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');

  ping.createSession().traceRoute('google.com', (err, data) => {
    if (err) {
      if (err.name === 'DNSError') console.log('err = ', err.message);
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
