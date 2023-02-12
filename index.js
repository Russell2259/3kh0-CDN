import express from 'express';
import fetch from 'node-fetch';

const app = express();
const repository = '3kh0/3kh0-Assets/main';

app.all('*', async (req, res) => {
    try {
        const file = await fetch(`https://raw.githubusercontent.com/${repository}${req.originalUrl}`);
        const data = new Buffer.from(await file.arrayBuffer());

        if (file.headers.get('content-type').split(';')[0] == 'text/plain' && data.includes('<!DOCTYPE html>')) {
            res.writeHead(file.status, { 'Content-Type': 'text/html' })
        } else {
            res.writeHead(file.status, { 'Content-Type': file.headers.get('content-type').split(';')[0] })
        }
        res.end(data);
    } catch (e) {
        res.sendStatus(404);
        throw new Error(e);
    }
})

app.listen(9000, () => {
    console.log('Your 3kh0.github.io CDN server is running on port 9000')
})