const { PORT = 3001 } = process.env
const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json());

app.post('/newProfile', (req, res, next) => {
    console.log('hitting endpoint with body: ', req.body);

})

app.listen(PORT, () => console.log('app listening on port 3001!'))