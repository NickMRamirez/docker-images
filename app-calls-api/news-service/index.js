const express = require('express')
const cors = require('cors')
const app = express()

// enable all CORS requests
app.use(cors())

const port = 80

function logRequest(req) {
    console.log(req.method + " " + req.originalUrl)
    console.log(req.headers);
}

function getRandomNoun(){
    let nouns = ["airplane", "bear", "cow", "dancer", "egg", "flower", "garden", "hairball", "igloo", "juggler", "kaleidoscope", "lint trap", "monkey", "noodle", "orange", "pianist", "quintuplet", "rocker", "squid", "trampoline", "uncle", "vehicle", "whale", "x-ray", "yuppie"];
    return nouns[Math.floor(Math.random() * nouns.length)];
}

function getRandomVerb() {
    let verbs = ["absconds", "brandishes", "collects", "dunks", "eats", "flicks", "guarantees", "hops", "imitates", "juggles", "laminates", "mimes", "needles", "offends", "praises", "quits", "races", "sneezes", "televises", "unlocks", "vanishes", "wears"];
    return verbs[Math.floor(Math.random() * verbs.length)];
}

app.get('/api/news/top-story', function(req, res) {
    logRequest(req)
    res.setHeader("Content-Type", "application/json");
    let randomTitle = getRandomNoun() + " " + getRandomVerb() + " " + getRandomNoun() + "s!";
    res.send(JSON.stringify({ status: "success", title: randomTitle }, null, 0));
})

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

process.on('SIGTERM', function() {
    server.close(function() {
        process.exit(0);
    })
})