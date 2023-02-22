import express from 'express';
import fetch from 'node-fetch';

const app = express();
const repository = '3kh0/3kh0-Assets/main';

app.all('/', async (req, res) => {
    const file = await fetch('https://raw.githubusercontent.com/3kh0/3kh0.github.io/main/assets/games.json');
    const games = await file.json();
    res.json(games);
})

app.all('*', async (req, res) => {
    try {
        const file = await fetch(`https://raw.githack.com/${repository}${req.originalUrl}`);
        const data = new Buffer.from(await file.arrayBuffer());
        
        if (file.status !== 404) {
            res.writeHead(file.status, { 'Content-Type': file.headers.get('content-type').split(';')[0] })
            res.end(data);
        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        res.sendStatus(404);
        throw new Error(e);
    }
})

app.listen(9000, () => {
    console.log('Your 3kh0.github.io CDN server is running on port 9000')
})