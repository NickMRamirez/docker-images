const express = require('express')
const cors = require('cors')
const mustacheExpress = require('mustache-express')
const http = require('http')

const app = express()

// enable all CORS requests
app.use(cors())

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

const port = 80

function logRequest(req) {
    console.log(req.method + " " + req.originalUrl)
}

// the UI
app.get('/', function (req, res) {
    logRequest(req);
    res.render('index', {})
})

// the API
app.get('/get-news', function(req, res) {
    logRequest(req);
    let url = "http://localhost:3000/api/news/top-story";

    // make request to upstream news service
    http.get(url, (r) => {
        if (r.statusCode == 200) {
            let str = "";
            r.on("data", (chunk) => str += chunk);
            r.on("end", () => {
                res.setHeader("Content-Type", "application/json");
                res.send(str);
            });
        }
        else {
            // return error response
            console.log("Got HTTP status: " + r.statusCode);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ status: "error", title: null }, null, 0));
        }
    })
    .on("error", (e) => {
        console.log("error calling " + url);
        console.log(e.message);
        console.log();

        // return error response
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ status: "error", title: null }, null, 0));
    });
})

app.listen(port, () => console.log(`Server listening on port ${port}`))