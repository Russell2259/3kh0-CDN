const express = require('express');
const fetch = require('node-fetch');

const app = express();
const repository = '1kh0/3kh0TEMP/main';

app.all('/', (req, res) => {
  fetch('https://raw.githubusercontent.com/3kh0/website-v4/main/assets/json/games.json')
    .then((file) => file.json())
    .then((games) => res.json(games))
    .catch((e) => {
      res.sendStatus(500);
      console.error(e);
    });
});

app.all('*', (req, res) => {
  fetch(`https://raw.githack.com/${repository}${req.originalUrl}`)
    .then((file) => {
      if (file.status !== 404) {
        return file.buffer();
      } else {
        res.sendStatus(404);
        return null;
      }
    })
    .then((data) => {
      if (data) {
        res.writeHead(file.status, { 'Content-Type': file.headers.get('content-type').split(';')[0] });
        res.end(data);
      }
    })
    .catch((e) => {
      res.sendStatus(500);
      console.error(e);
    });
});

app.listen(9000, () => {
  console.log('Your 3kh0.net CDN server is running on port 9000');
});
