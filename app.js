const { PORT = 3001 } = process.env
const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser');
var http = require('http');


app.use('/', express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json());

app.post('/newProfile', (req, res, next) => {
    const name = req.body.name
    console.log('hitting endpoint with body: ', req.body);
    // http.createServer(function () {
    //     res.write('<html><head></head><body>');
    //     res.write(`<p>The website of the famous: ${req.body.name}</p>`);
    //     res.end('</body></html>');
    // }).listen(1337);
    const newApp = express();
    newApp.get('/', (request, response) => response.status(200).send('new website with: ' + name))
    newApp.listen(3002, () => console.log('app listening on port 3002!'))
})

app.listen(PORT, () => console.log('app listening on port 3001!'))