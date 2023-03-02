import fetch from 'node-fetch';

const repository = '3kh0/3kh0-Assets/main';

const express_ = (path = '') => {
    try {
        return async function (req, res, next) {
            if (req.path == path) {
                try {
                    const file = await fetch('https://raw.githubusercontent.com/3kh0/3kh0.github.io/main/assets/json/games.json');
                    const games = await file.json();
                    res.json(games);
                } catch (e) {
                    res.sendStatus(404);
                }
            }

            if (req.path.startsWith(path) && req.path != path) {
                try {
                    const file = await fetch(`https://raw.githack.com/${repository}/${req.originalUrl.replace(path, '')}`);
                    const data = new Buffer.from(await file.arrayBuffer());

                    if (file.status !== 404) {
                        res.writeHead(file.status, { 'Content-Type': file.headers.get('content-type').split(';')[0] })
                        res.end(data);
                    } else {
                        res.sendStatus(404);
                    }
                } catch (e) {
                    res.sendStatus(404);

                    console.error(e);
                }
            }
        }
    } catch (e) {
        throw e;
    }
}

class CDN {
    constructor() {
        this.express = express_;

        this.repository = repository;
    }
}

export default new CDN();