const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const urls = [
  '/*'
];


app.use(express.static(path.join(__dirname, 'build')));
app.get(urls, (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, (error) => {
  if (error) {
    console.warn(error);
  } else {
    console.warn('==> Ã°Å¸Å’Å½ Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});
