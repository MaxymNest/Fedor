const https = require('https');

module.exports = (req, res) => {
  console.log("Proxy server received a request.");

  const { url } = req.query;

  if (!url) {
    console.log("Error: No URL provided.");
    return res.status(400).send('No URL provided.');
  }

  console.log(`Attempting to fetch URL: ${url}`);

  https.get(url, (proxyRes) => {
    console.log(`Received response from the target URL: ${url}`);
    console.log(`Response status code: ${proxyRes.statusCode}`);

    proxyRes.on('data', (chunk) => {
      console.log(`Received chunk of data: ${chunk.length} bytes`);
    });

    proxyRes.on('end', () => {
      console.log("No more data in response.");
    });

    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  }).on('error', (e) => {
    console.error('Error fetching the URL:', e.message);
    res.status(500).send('Error: ' + e.message);
  });
};
